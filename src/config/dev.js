var config = {
     
    mongo: {
        url: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/erp'
    },
     
}

module.exports = config;