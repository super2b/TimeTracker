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

  async startTask(uid, tid) {
    // 更新task表里面task的状态 为 1

    // 在time_record表添加一条记录，并将返回的id存入到redis里面

    // 返回客户端
  }
}

module.exports = TaskService;
