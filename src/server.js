const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const formidable = require("express-formidable");
var routes = require('./router');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(formidable());


 
const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`) 

  res.on('finish', () => {
      console.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
  })
  
  next()
}

app.use(logRequestStart)
routes.register(app);
app.listen(3001, () => {
  try {
     emaillistener.listen();
  } catch (error) {  
  }

  console.log('Server running on localhost:3001');
});

module.exports = app;