const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Deities']
    const result = await mongodb.getDatabase().db().collection('deities').find();
    result.toArray().then((deities) => {
        if (deities.length == 0) {
            res.status(404).json(`Resources not found!`)
        }
        res.setHeader('Content-Typer', 'application/json');
        res.status(200).json(deities);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Deities']

    const deityId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('deities').find({ _id: deityId});
    result.toArray().then((deities) => {
        if (deities.length == 0) {
            res.status(404).json(`Resource not found with id ${deityId}`)
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(deities[0]);
    });
}; 

const createDeity = async (req, res) => {
    //#swagger.tags=['Deities']
    const deity = {
        name: req.body.name,
	    alignment: req.body.alignment,
	    domains: req.body.domains,
	    portfolio: req.body.portfolio,
	    power: req.body.power,
	    realm: req.body.realm,
	    symbol: req.body.symbol,
	    favoredMonsters: req.body.favoredMonsters,
	    favoredAnimals: req.body.favoredAnimals,
	    favoredWeapon: req.body.favoredWeapon,
	    favoredColors: req.body.favoredColors,
	    favoredMinerals: req.body.favoredMinerals
    };
    const response = await mongodb.getDatabase().db().collection('deities').insertOne(deity)
    if (response.acknowledged > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the deity.')
    }
};

const updateDeity = async (req, res) => {
    //#swagger.tags=['Deities']
    const deityId = new ObjectId(req.params.id);
    const deity = {
        name: req.body.name,
	    alignment: req.body.alignment,
	    domains: req.body.domains,
	    portfolio: req.body.portfolio,
	    power: req.body.power,
	    realm: req.body.realm,
	    symbol: req.body.symbol,
	    favoredMonsters: req.body.favoredMonsters,
	    favoredAnimals: req.body.favoredAnimals,
	    favoredWeapon: req.body.favoredWeapon,
	    favoredColors: req.body.favoredColors,
	    favoredMinerals: req.body.favoredMinerals
    };
    const response = await mongodb.getDatabase().db().collection('deities').replaceOne({ _id:deityId}, deity)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the deity.')
    }
};

const deleteDeity = async (req, res) => {
    //#swagger.tags=['Deities']
    const deityId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('deities').deleteOne({ _id:deityId});
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the deity.')
    }
};


module.exports = {
    getAll, getSingle, createDeity, updateDeity, deleteDeity
};