
 
exports.register = (app) => {
    
    app.use('/api/csv', require('../src/csvupload'));


}


