const express = require('express');
const router = express.Router();

const deitiesController = require('../controllers/deities');
const validation = require('../middleware/validate');

router.get('/', deitiesController.getAll);

router.get('/:id', deitiesController.getSingle);

router.post('/', validation.saveDeity ,deitiesController.createDeity);

router.put('/:id', validation.saveDeity, deitiesController.updateDeity);

router.delete('/:id', deitiesController.deleteDeity);

module.exports = router;