'use strict';

const Service = require('../core/base_service');
const Result = require('../model/result');
const moment = require('moment');
const uuid = require('uuid/v4');
const timeFormat = 'YYYY-MM-DD HH:mm:ss';

class TaskService extends Service {

  /**
   * 添加一条任务
   * @param {int} uid 用户id
   * @param {string} name 任务名称 
   * @param {string} desc 描述
   */
  async insert(uid, name, desc) {
    try {
      let tid = uuid().split('-').join('');
      const dbResult = await this.app.mysql.insert('task', 
        {
          t_id: tid,u_id: uid,
          t_name: name, 
          t_desc: desc
        });
      return new Result(true, "创建任务成功", { t_id: tid });
    } catch (err) {
      throw err;
    }
  }

  /**
   * 根据tid查找一条指定的id
   * @param {int} uid 用户id
   * @param {int} tid 任务id
   */
  async find(uid, tid) {
    const task = await this.app.mysql.get('task', {'t_id': tid, 'u_id': uid});
    if (!task) {
      let err = new Error('任务不存在或者已删除')
      err.status = 403
      throw(err)
    }
    return task;
  }

  /**
   * 分页查找指定用户的任务列表
   * @param {int} uid      用户id
   * @param {int} pageno   页码
   * @param {int} pagesize 页长
   */
  async list(uid, pageno, pagesize) {
    const {logger} = this.app
    const tasks = await this.app.mysql.select('task', {
      where: {'u_id': uid},
      limit: Number(pagesize),
      offset: (pageno - 1) * pagesize,
      orders: [['update_time', 'desc']],
    })
    logger.info('the tasks existed in mysql db: %s', tasks.length)
    const totalCount = await this.app.mysql.count('task', {'u_id': uid});
    const data = {}
    const updatedTaks = new Array();
    
    // 计算每个task所耗费的时间 根据redis里面的时间进行计算
    logger.info('start to loop the tasks')
    for (var i =0; i < tasks.length; i++) {
      let t = tasks[i]
      let cachedTask = await this.app.redis.get(t.t_id)
      if (cachedTask) {
        let endTime = 0
        let startTime = 0
        cachedTask = JSON.parse(cachedTask)
        // 如果为未开始或者已经结束的状态的话，直接去获取start_time和end_time
        if (cachedTask.status === 0 || cachedTask.status === 2) {
          endTime = moment(cachedTask.end_time, timeFormat) || moment()
          startTime = moment(cachedTask.start_time, timeFormat) || moment()
        } else if (cachedTask === 1) { // 任务进行中，则只要当前时间 - start_time
          endTime = moment()
          startTime = moment(cachedTask.start_time, timeFormat);
        }
        
        let elapse = endTime - startTime
        let totalSeconds = elapse / 1000
        let hour = totalSeconds / 3600
        let min = totalSeconds % 3600 / 60
        let second = totalSeconds % 3600 % 60
        t.duration = {
          "hour": parseInt(hour),
          "min":  parseInt(min),
          "second": parseInt(second)
        }
        updatedTaks.push(t)
      }
    }
    data.list = updatedTaks
    data.pageno = pageno
    data.pagesize = pagesize
    data.totalCount = totalCount
    const result = new Result(true, '获取任务列表成功', data)
    return result
  }

  /**
   * 启动任务，首先要检查这个任务是否属于对应用户的，如果不是，则直接返回用户错误。
   * 然后验证状态是否正确，比如一个用户已经处于开始状态的话，仍然接受到一个开始的指令，这种情况需要做数据阻挡。
   * 通过验证之后，在mysql里面的time_record表里面添加一条记录，start_time标志为当前时间，end_time留空
   * mysql数据插入完毕之后，redis里面添加一条记录，包括 {key为tid，状态为1，record_id: mysql里面的record_id}
   * 
   * @param {int} uid 用户id
   * @param {int} tid 任务id
   */
  async startTask(uid, tid) {
    let cachedTimeRecord = await this.checkTask(uid, tid, 0)
    // 在time_record表添加一条记录，并将返回的id存入到redis里面
    let startTime = moment().format(timeFormat)
    let rid = uuid().split('-').join('')
    const timeRecord = await this.app.mysql.insert('time_record', {"r_id": rid, "t_id": tid, "start_time": startTime})
    cachedTimeRecord.start_time = cachedTimeRecord.start_time||startTime
    cachedTimeRecord.status = 1
    cachedTimeRecord.record_id = rid
    await this.app.redis.set(tid, JSON.stringify(cachedTimeRecord))
    // 返回客户端
    return new Result(true, '启动任务成功')
  }

  /**
   * 停止任务，首先要检查这个任务是否属于对应用户的，如果不是，则直接返回用户错误。
   * 然后验证状态是否正确，比如一个用户已经处于开始状态的话，仍然接受到一个开始的指令，这种情况需要做数据阻挡。
   * 通过验证之后，更新mysql里面对应的record_id的time_record记录的end_time字段。
   * 然后更新redis里面的status字段
   * @param {int} uid 用户id
   * @param {int} tid 任务id
   */
  async stopTask(uid, tid) {
    let storedTaskInfo = await this.checkTask(uid, tid, 1)
    if (storedTaskInfo.status === 2) {
      throw new Error(403, "任务状态已经发生变更，请刷新页面获取最新状态")
    }
    let endTime = moment().format(timeFormat)
    await this.app.mysql.update('time_record', {end_time: endTime},
      {
        where: { r_id: storedTaskInfo.record_id }
      })
    storedTaskInfo.end_time = endTime
    storedTaskInfo.status = 0
    await this.app.redis.set(tid,JSON.stringify(storedTaskInfo))
    return new Result(true, '操作成功')  
  }

  /**
   * 完成一个任务，首先要检查这个任务是否属于对应用户的，如果不是，则直接返回用户错误。
   * 
   * @param {int} uid 
   * @param {int} tid 
   */
  async finishTask(uid, tid) {
    const {logger} = this.app
    let storedTaskInfo = await this.checkTask(uid, tid, -1)
    let endTime = moment().format(timeFormat)
    if (storedTaskInfo.status == 0) {// 没有开始就结束的任务或者处于暂停状态的任务
      await this.app.mysql.update('time_record', 
      // 如果redis里面没有end_time表示开始了未暂停过
      { 'end_time': storedTaskInfo.end_time || storedTaskInfo.start_time },
      {
        where: { r_id: storedTaskInfo.record_id }
      })
    } else if (storedTaskInfo.status == 1) { // 处于开始状态的任务直接进行结束操作
      storedTaskInfo.end_time = endTime
      await this.app.mysql.update('time_record', 
        {'end_time': endTime},
        {
          where: { r_id: storedTaskInfo.record_id }
        })
    } else if (storedTaskInfo.status == 2) { // 已经结束的任务再次进行结束操作
      let err = new Error("任务状态已经发生变更，请刷新页面获取最新状态")
      err.status = 403
      throw err
    }
    
    storedTaskInfo.status = 2
    await this.app.redis.set(tid, JSON.stringify(storedTaskInfo))
    return new Result(true, '操作成功')  
  }

  /**
   * 检查这个task是否归属于指定用户的，然后判断是否为正确的状态；如果传入的status=-1, 那么这种情况下，不对状态进行判断。
   * @param {int} uid 用户id
   * @param {int} tid task id
   * @param {int} status 检查的状态不能为这个状态，如果负数的话表示忽略状态监测
   */
  async checkTask(uid, tid, status) {
    const task = await this.find(uid, tid)
    if (!task) {
      let error = new Error('无权限进行此操作')
      error.status = 403
      throw error
    }
    let storedTaskInfo = await this.app.redis.get(tid)
    if (storedTaskInfo) {
      storedTaskInfo = JSON.parse(storedTaskInfo)
      if (status >= 0 && storedTaskInfo.status != status) {
        const err = new Error('任务状态已经发生变更，请刷新页面获取最新状态');
        err.status = 403
        throw(err)
      }
      return storedTaskInfo
    } 
    return new Error(403, '不允许此操作')
  }
}

module.exports = TaskService;
