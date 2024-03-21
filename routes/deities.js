const express = require('express');
const router = express.Router();

const deitiesController = require('../controllers/deities');
const validation = require('../middleware/validate');

router.get('/', deitiesController.getAll);

router.get('/:id', validation.validObjectId, deitiesController.getSingle);

router.post('/', validation.saveDeity ,deitiesController.createDeity);

router.put('/:id', validation.validObjectId, validation.saveDeity, deitiesController.updateDeity);

router.delete('/:id', validation.validObjectId, deitiesController.deleteDeity);

module.exports = router;