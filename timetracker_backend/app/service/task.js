const Service = require('egg').Service;

class TaskService extends Service {

  async insert(name, desc) {
    const result = await this.app.mysql.insert('task', {t_name: name, t_desc: desc})
    console.log('result:' + result);
    return {
      'result': result.affectedRows === 1 ?"创建任务成功" : "创建失败",
      'success': 'ture'
    };
  }

  async find(tid) {
    const task = await this.app.mysql.get('tasks', {id: tid})
    return task;
  } 
}

module.exports = TaskService;
