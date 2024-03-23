const express = require('express');
const router = express.Router();

const deitiesController = require('../controllers/deities');
const validation = require('../middleware/validate');
const {isAuthenticated} = require("../middleware/authenticate")

router.get('/', deitiesController.getAll);

router.get('/:id', validation.validObjectId, deitiesController.getSingle);

router.post('/', isAuthenticated, validation.saveDeity ,deitiesController.createDeity);

router.put('/:id', isAuthenticated, validation.validObjectId, validation.saveDeity, deitiesController.updateDeity);

router.delete('/:id', isAuthenticated, validation.validObjectId, deitiesController.deleteDeity);

module.exports = router;