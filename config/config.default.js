/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1673882244224_2476';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    url: `mongodb://username:123456@81.69.30.202:27017/jira`,
    options: {},
    plugins: []
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  config.errorHandler = {
    match: '/api/v1'
  }

  config.validate = {
    // 对参数可以使用 convertType 规则进行类型转换
    convert: true,
    widelyUndefined: true
  }

  config.jwt = {
    secret: 'f06a8fa0-33c7-4728-a83e-982f4d467a39'
  }


  return {
    ...config,
    ...userConfig,
  };
};
