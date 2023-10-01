// config environment

require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local',
});

const config = {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
};

module.exports = config;
