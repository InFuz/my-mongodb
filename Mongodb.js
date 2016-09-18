'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/myproject';

const Mongodb = {
  connect: (cb) => {
    MongoClient.connect(url, (err, db) => {
      if (err) { console.error(err); }
      Mongodb.DB = db;
      cb(err);
    });
  },

  find: (collection, id, cb) => {
    id = ObjectId(id);
    let con = Mongodb.DB.collection(collection);
    con.findOne({_id: id}, (err, result) => cb(err, result));
  },

  findAll: (collection, cb) => {
    let con = Mongodb.DB.collection(collection);
    con.find({}).toArray((err, result) => cb(err, result));
  },

  insert: (collection, data, cb) => {
    let con = Mongodb.DB.collection(collection);
    con.insertOne(data, (err, result) => cb(err, result.insertedId));
  },

  update: (collection, id, data, cb) => {
    id = ObjectId(id);
    let con = Mongodb.DB.collection(collection);
    con.update({_id: id}, data, (err, result) => cb(err, id));
  },

  delete: (collection, id, cb) => {
    let con = Mongodb.DB.collection(collection);
    con.deleteOne({_id: id}, (err, result) => cb(err));
  },
}

module.exports = Mongodb;
