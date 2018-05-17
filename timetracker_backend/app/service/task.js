const Service = require('../core/base_service');
const Result = require('../model/result')
class TaskService extends Service {
  /**
   * 添加一条任务
   * @param {int} uid 用户id
   * @param {string} name 任务名称 
   * @param {string} desc 描述
   */
  async insert(uid, name, desc) {
    try {
      const dbResult = await this.app.mysql.insert('task', {u_id: uid, t_name: name, t_desc: desc})
      return new Result(true, "创建任务成功", {t_id: dbResult.insertId})
    } catch (err) {
      throw err
    }
  }

  /**
   * 根据tid查找一条指定的id
   * @param {int} uid 用户id
   * @param {int} tid 任务id
   */
  async find(uid, tid) {
    const task = await this.app.mysql.get('task', {'t_id': tid, 'u_id': uid})
    return task;
  }

  /**
   * 分页查找指定用户的任务列表
   * @param {int} uid      用户id
   * @param {int} pageno   页码
   * @param {int} pagesize 页长
   */
  async list(uid, pageno, pagesize) {
    const tasks = await this.app.mysql.select('task', {
      where: {'u_id': uid},
      limit: Number(pagesize),
      offset: (pageno - 1) * pagesize,
      orders: [['update_time', 'desc']],
    })
    const totalCount = await this.app.mysql.count('task', {'u_id': uid});
    const data = {}
    data.list = tasks
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
    this.checkTask(uid, tid, 0)
    // 在time_record表添加一条记录，并将返回的id存入到redis里面
    const timeRecord = await this.app.mysql.insert('time_record', {"t_id": tid, "start_time": Date.now()})
    await this.app.redis.set(tid, {'start_time': Date.now(), 'status': 1, 'record_id': timeRecord.insertId})
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
    let storedTaskInfo = this.checkTask(uid, tid, 1)
    if (storedTaskInfo.status === 2) {
      throw new Error(403, "任务状态已经发生变更，请刷新页面获取最新状态")
    }
    await this.app.mysql.update('time_record', 
      {"record_id": storedTaskInfo.record_id}, {'end_time': Date.now})
    await this.app.redis.set(tid, {'start_time': storedTaskInfo.start_time, 'status': 0, 'record_id': storedTaskInfo.record_id})
    return new Result(true, '操作成功')  
  }

  /**
   * 完成一个任务，首先要检查这个任务是否属于对应用户的，如果不是，则直接返回用户错误。
   * 
   * @param {int} uid 
   * @param {int} tid 
   */
  async finish(uid, tid) {
    let storedTaskInfo = this.checkTask(uid, tid, -1)

    if (storedTaskInfo.status == 0) {// 没有开始就结束的任务
      await this.app.mysql.update('time_record', 
        {"record_id": storedTaskInfo.record_id}, {'end_time': storedTaskInfo.start_time})
    } else if (storedTaskInfo.start_time == 1) { // 处于开始状态的任务直接进行结束操作
      await this.app.mysql.update('time_record', 
        {"record_id": storedTaskInfo.record_id}, {'end_time': Date.now})
    } else if (storedTaskInfo.status == 2) { // 已经结束的任务再次进行结束操作
      throw new Error(403, "任务状态已经发生变更，请刷新页面获取最新状态")
    }
    await this.app.redis.set(tid, {'start_time': storedTaskInfo.start_time, 'status': 2, 'record_id': storedTaskInfo.record_id})
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
      throw new Error(403, "无权限进行此操作")
    }
    const storedTaskInfo = await this.redis.get(tid)
    if (storedTaskInfo) {
      if (status > 0 && storedTaskInfo.status != status) {
        throw new Error(403, "任务状态已经发生变更，请刷新页面获取最新状态")
      }
    } else {
      throw new Error(403, "任务不存在")
    }
    return storedTaskInfo
  }
}

module.exports = TaskService;
