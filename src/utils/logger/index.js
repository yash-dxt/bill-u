var config = require('../../../config');
require('dotenv').config();

var log4js = require("log4js");

var logger = log4js.getLogger();


/* 
 Sets the logger level according to the environment.
 If the environment is local we use debug. We don't use console.log everywhere. 
*/

if (config.environment == "local") {
    logger.level = "debug"
} else {
    logger.level = "info";
}

module.exports = logger