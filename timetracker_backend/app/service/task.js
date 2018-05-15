const Service = require('../core/base_service');
const Result = require('../model/result')
class TaskService extends Service {

  async insert(uid, name, desc) {
    try {
      const dbResult = await this.app.mysql.insert('task', {u_id: uid, t_name: name, t_desc: desc})
      return new Result(true, "创建任务成功", {t_id: dbResult.insertId})
    } catch (err) {
      throw err
    }
  }

  async find(tid) {
    const task = await this.app.mysql.get('task', {'t_id': tid})
    return task;
  }

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
}

module.exports = TaskService;
