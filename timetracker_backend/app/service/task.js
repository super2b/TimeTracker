const Service = require('egg').Service;

class TaskService extends Service {
  async find(tid) {
    const task = {
      content: 'first task',
      create_time: '2018-04-24'
    };
    return task;
  } 
}

module.exports = TaskService;
