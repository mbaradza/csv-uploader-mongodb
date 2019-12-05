var express = require('express');
const controller = require('./csvupload.controller');

var router = express.Router();

router.post('/upload', controller.upload);
module.exports = router;