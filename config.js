require('dotenv').config();

const env = process.env.NODE_ENV;

const dev = {
    environment: process.env.NODE_ENV,

}


const local = {

    environment: process.env.NODE_ENV,

}


const prod = {
    environment: process.env.NODE_ENV,

}

const config = {
    dev,
    prod,
    local
}

module.exports = config[env];