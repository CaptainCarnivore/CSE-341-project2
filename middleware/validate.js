const validator = require('../helpers/validate');
const ObjectId = require('mongodb').ObjectId;

const validObjectId = (req, res, next) => {
  const id = req.params.id;
  const validationRule = {
    id: 'hex|size:24'
  }
  validator(req.params, validationRule, {size: 'ID must be a 24 character hex string.', hex:  'ID must be a 24 character hex string.'}, (err, status) => {
    console.log(status);
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
}


const saveCharacter = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
	lastName: 'string',
	characterAge: 'numeric',
	birthYear: 'numeric',
	sex: 'in:male,female,other',
	race: 'required|string',
	class: 'required|string',
	alignment: 'in:lawful good,neutral good,chaotic good,lawful neutral,neutral,true neutral,chaotic neutral,lawful evil,neutral evil,chaotic evil',
	home: 'string',
	status: 'required|string',
	deathYear: 'numeric',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveDeity = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
	    alignment: 'required|string',
	    domains: 'required|array',
	    portfolio: 'required|array',
	    power: 'required|string',
	    realm: 'required|string',
	    symbol: 'required|string',
	    favoredMonsters: 'array',
	    favoredAnimals: 'array',
	    favoredWeapon: 'string',
	    favoredColors: 'array',
	    favoredMinerals: 'array'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  saveCharacter, saveDeity, validObjectId
};