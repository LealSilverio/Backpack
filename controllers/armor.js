const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('armor').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('armor').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createItem = async (req, res) => {
  const armor = {
    name: req.body.name,
    type: req.body.type,
    defense: req.body.defense,
    weight: req.body.weight,
    durability: req.body.durability,
    material: req.body.material,
    description: req.body.description
  };
  const response = await mongodb.getDb().db().collection('armor').insertOne(armor);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the armor.');
  }
};

const updateItem = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const armor = {
    name: req.body.name,
    type: req.body.type,
    defense: req.body.defense,
    weight: req.body.weight,
    durability: req.body.durability,
    material: req.body.material,
    description: req.body.description
  };
  const response = await mongodb.getDb().db().collection('armor').replaceOne({ _id: userId }, armor);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the armor.');
  }
};

const deleteItem = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('armor').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the armor.');
  }
};

module.exports = { getAll, getSingle, createItem, updateItem, deleteItem };
