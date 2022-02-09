require('dotenv').config();

const env = process.env.NODE_ENV;

const dev = {
    environment: process.env.NODE_ENV,
    mongo: {
        uri: process.env.MONGO_URI
    }
}


const local = {

    environment: process.env.NODE_ENV,
    mongo: {
        uri: process.env.MONGO_URI
    }
}


const prod = {
    environment: process.env.NODE_ENV,
    mongo: {
        uri: process.env.MONGO_URI
    }
}

const config = {
    dev,
    prod,
    local
}

module.exports = config[env];