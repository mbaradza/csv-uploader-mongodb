const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
var config = require('../config');
var fs = require('fs');

exports.upload = async (req, res) => {

  const database = req.fields.database;
  const collection = req.fields.collection;
  const filePath = req.files.file.path
  const url = config.mongo.url

  var newHeaders = []

  //Read Headers Only And Manipulate Them
  await csvtojson()
    .on('header', (header) => {
      for (var h of header) {
        if (newHeaders.indexOf(h) >= 0) {
          h = h + "_1"
        }
        newHeaders.push(h)
      }
    })
    .fromFile(filePath);

  //Second Call To Read The Data And Attach The New Headers
  csvtojson({
    noheader: false,
    headers: newHeaders
  })
    .fromFile(filePath)
    .then(csvData => {
      console.log(csvData);

      mongodb.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, client) => {
          if (err) throw err;

          client
            .db(database)
            .collection(collection)
            .insertMany(csvData, (err, res) => {
              if (err) throw err;
              console.log(`Inserted: ${res.insertedCount} rows`);
              client.close();
            });
        }
      );
      res.status(201).json(csvData);
    })

}