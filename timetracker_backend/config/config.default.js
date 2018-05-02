'use strict';

module.exports = appInfo => {
  const config = exports = {
    security: {
      csrf: {
        enable: false
      }
    },
    mysql: {
      client: {
        // host
        host: '192.168.0.105',
        // 端口号
        port: '3306',
        // 用户名
        user: 'client_web',
        // 密码
        password: '123456',
        // 数据库名
        database: 'timetracker',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    redis: {
      client: {
        port: 6379,
        host: '192.168.0.105',
        password: '123456',
        db: 0
      }
    }
  };

  config.jwt = {
    secret: 'nicokids!',
    enable: false,
  };


  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1524406271246_2548';
  config.jwttoken = {
    expire_in_min: '10m',
    expire_in_sec: 10 * 60
  }
  config.salt_bounds = 10
  // add your config here
  config.middleware = [];
  return config;
};

