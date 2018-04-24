const Service = require('egg').Service;

class TaskService extends Service {
  async find(tid) {
    const task = await this.app.mysql.get('tasks', {id: tid})
    return task;
  } 
}

module.exports = TaskService;
