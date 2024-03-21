const express = require('express');
const router = express.Router();

const charactersController = require('../controllers/characters');
const validation = require('../middleware/validate');

router.get('/', charactersController.getAll);

router.get('/:id', validation.validObjectId, charactersController.getSingle);

router.post('/', validation.saveCharacter, charactersController.createCharacter);

router.put('/:id', validation.validObjectId, validation.saveCharacter, charactersController.updateCharacter);

router.delete('/:id', validation.validObjectId, charactersController.deleteCharacter);

module.exports = router;