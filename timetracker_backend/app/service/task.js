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
    const task = await this.app.mysql.get('tasks', {id: tid})
    return task;
  } 
}

module.exports = TaskService;
