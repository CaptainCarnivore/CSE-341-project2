const express = require('express');
const router = express.Router();

const charactersController = require('../controllers/characters');
const validation = require('../middleware/validate');
const {isAuthenticated} = require("../middleware/authenticate")

router.get('/', charactersController.getAll);

router.get('/:id', validation.validObjectId, charactersController.getSingle);

router.post('/', isAuthenticated, validation.saveCharacter, charactersController.createCharacter);

router.put('/:id', isAuthenticated, validation.validObjectId, validation.saveCharacter, charactersController.updateCharacter);

router.delete('/:id', isAuthenticated, validation.validObjectId, charactersController.deleteCharacter);

module.exports = router;