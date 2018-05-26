'use strict';

class Result {
  constructor(success, msg, data) {
    this.success = success;
    this.msg = msg;
    this.value = data;
  }
}

module.exports = Result;
