var configValues = require('./config');
module.exports = {
    getDbConnectionString: function () {
        return `mongodb://${configValues.userName}:${configValues.password}@ds123532.mlab.com:23532/cinema`;
    }
}