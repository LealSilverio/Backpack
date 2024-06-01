const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('healing').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('healing').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createItem = async (req, res) => {
  const item = {
    name: req.body.name,
    type: req.body.type,
    healingAmount: req.body.healingAmount,
    weight: req.body.weight,
    description: req.body.description
  };
  const response = await mongodb.getDb().db().collection('healing').insertOne(item);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the item.');
  }
};

const updateItem = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const item = {
    name: req.body.name,
    type: req.body.type,
    healingAmount: req.body.healingAmount,
    weight: req.body.weight,
    description: req.body.description
  };
  const response = await mongodb.getDb().db().collection('healing').replaceOne({ _id: userId }, item);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the item.');
  }
};

const deleteItem = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('healing').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the item.');
  }
};

module.exports = { getAll, getSingle, createItem, updateItem, deleteItem };
