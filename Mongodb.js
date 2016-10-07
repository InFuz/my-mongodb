'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/simple_chat';

const Mongodb = {
  connect: () => {
    return new Promise ((res, rej) => {
      MongoClient.connect(url, (err, db) => {
        err ? rej (err) : (Mongodb.DB = db, res());
      });
    });
  },

  find: (collection, id) => {
    return new Promise ((res, rej) => {
      id = ObjectId(id);
      let con = Mongodb.DB.collection(collection);
      con.findOne({_id: id}, (err, result) => err ? rej(err) : res(result));  
    });
  },

  findAll: (collection) => {
    return new Promise ((res, rej) => {
      let con = Mongodb.DB.collection(collection);
      con.find({}).toArray((err, result) => err ? rej(err) : res(result));
    });
  },

  insert: (collection, data) => {
    return new Promise ((res, rej) => {
      let con = Mongodb.DB.collection(collection);
      con.insertOne(data, (err, result) => err ? rej(err) : res(result.insertedId));
    })
  },

  update: (collection, id, data) => {
    return new Promise ((res, rej) => {
      id = ObjectId(id);
      let con = Mongodb.DB.collection(collection);
      con.update({_id: id}, data, (err, result) => err ? rej(err) : res(id));
    })
  },

  delete: (collection, id) => {
    return new Promise ((res, rej) => {
      let con = Mongodb.DB.collection(collection);
      con.deleteOne({_id: id}, (err, result) => {
        err ? rej (err) : res(result);
      });
    })
  }
}

module.exports = Mongodb;
