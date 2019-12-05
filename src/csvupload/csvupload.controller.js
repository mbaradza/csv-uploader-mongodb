const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
var config = require('../config');

exports.upload = async (req, res) => {

   const database = req.fields.database;
  const collection =req.fields.collection;
  const filePath = req.files.file.path
  const url = config.mongo.url
  
   csvtojson()
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