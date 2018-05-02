'use strict';

const Controller = require('../core/base_controller');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
