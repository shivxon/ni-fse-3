const mongoose = require('mongoose');

let DB_URL = `${process.env.DB_URL_DEV}`

if(process.env.ENV == 'prod'){
    DB_URL = `${process.env.DB_URL_PROD}`
}

mongoose.connect(DB_URL);
mongoose.connection.once('open', function() {
    console.log('connection has been made');
}).on('error', function(error) {
    console.log('error is :', error);
});

module.exports = mongoose;