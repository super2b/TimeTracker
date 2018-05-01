'use strict';

// had enabled by egg
// exports.static = true;

exports.mysql = {
  enable: true,
  package: 'egg-mysql'
};

// exports.oAuth2Server = {
//   enable: true,
//   package: 'egg-oauth2-server',
// };

exports.redis = {
  enable: true,
  package: 'egg-redis'
}

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}