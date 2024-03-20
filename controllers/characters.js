const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Characters']
    const result = await mongodb.getDatabase().db().collection('characters').find();
    result.toArray().then((characters) => {
        if (characters.length == 0) {
            res.status(404).json(`Resources not found!`)
        }
        res.setHeader('Content-Typer', 'application/json');
        res.status(200).json(characters);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Characters']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid character id to find a character.');
      }

    const characterId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('characters').find({ _id: characterId});
    result.toArray().then((characters) => {
        if (characters.length == 0) {
            res.status(404).json(`Resource not found with id ${characterId}`)
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(characters[0]);
    });
}; 

const createCharacter = async (req, res) => {
    //#swagger.tags=['Characters']
    const character = {
        firstName: req.body.firstName,
	    lastName: req.body.lastName,
	    characterAge: req.body.characterAge,
	    birthYear: req.body.birthYear,
	    sex: req.body.sex,
	    race: req.body.race,
	    class: req.body.class,
	    alignment: req.body.alignment,
	    home: req.body.home,
	    status: req.body.status,
	    deathYear: req.body.deathYear,
    };
    const response = await mongodb.getDatabase().db().collection('characters').insertOne(character)
    if (response.acknowledged > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the character.')
    }
};

const updateCharacter = async (req, res) => {
    //#swagger.tags=['Characters']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid character id to find a character.');
      }
    const characterId = new ObjectId(req.params.id);
    const character = {
        firstName: req.body.firstName,
	    lastName: req.body.lastName,
	    characterAge: req.body.characterAge,
	    birthYear: req.body.birthYear,
	    sex: req.body.sex,
	    race: req.body.race,
	    class: req.body.class,
	    alignment: req.body.alignment,
	    home: req.body.home,
	    status: req.body.status,
	    deathYear: req.body.deathYear,
    };
    const response = await mongodb.getDatabase().db().collection('characters').replaceOne({ _id:characterId}, character)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the character.')
    }
};

const deleteCharacter = async (req, res) => {
    //#swagger.tags=['Characters']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid character id to find a character.');
      }
    const characterId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('characters').deleteOne({ _id:characterId});
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the character.')
    }
};


module.exports = {
    getAll, getSingle, createCharacter, updateCharacter, deleteCharacter
};