const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');

});

router.use('/characters', require('./characters'));
router.use('/deities', require('./deities'));

module.exports = router;