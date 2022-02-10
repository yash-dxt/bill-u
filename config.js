require('dotenv').config();

const env = process.env.NODE_ENV;

const dev = {
    environment: process.env.NODE_ENV,
    mongo: {
        uri: process.env.MONGO_URI
    },
    hosting: {
        port: process.env.APP_PORT,
        host: process.env.APP_HOST

    }

}


const local = {

    environment: process.env.NODE_ENV,
    mongo: {
        uri: process.env.MONGO_URI
    },
    hosting: {
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    }
}


const prod = {
    environment: process.env.NODE_ENV,
    mongo: {
        uri: process.env.MONGO_URI
    },

    hosting: {
        port: process.env.APP_PORT,
        host: process.env.APP_HOST

    }
}

const config = {
    dev,
    prod,
    local
}


/* 

The code above is a simple way to set up a configuration object that will be used to set up the
environment for the application. 

*/

module.exports = config[env];