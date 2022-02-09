require('dotenv').config();

const env = process.env.NODE_ENV;

const dev = {
    environment: process.env.NODE_ENV,
    mongo: {
        uri: process.env.MONGO_URI
    },
    hosting: {
        port: process.env.APP_PORT,

    }

}


const local = {

    environment: process.env.NODE_ENV,
    mongo: {
        uri: process.env.MONGO_URI
    },
    hosting: {
        port: process.env.APP_PORT,
    }
}


const prod = {
    environment: process.env.NODE_ENV,
    mongo: {
        uri: process.env.MONGO_URI
    },

    hosting: {
        port: process.env.APP_PORT,

    }
}

const config = {
    dev,
    prod,
    local
}

module.exports = config[env];