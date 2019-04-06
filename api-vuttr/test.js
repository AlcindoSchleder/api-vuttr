const ApiUtils = require('../commom/utils');
const env = process.env.NODE_ENV || 'development';
const config = require('./src/db/config/config.json')[env];

const dsn = ((config.use_env_variable) ?  
    ApiUtils.genDSN(process.env[config.use_env_variable], 'env') :
    ApiUtils.genDSN(config, 'config'));

console.log('dsn: ', dsn);