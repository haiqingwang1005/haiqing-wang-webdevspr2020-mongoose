const express = require('express');
const router = express.Router();
const tinyController = require('../controller/tinyController');

router.get('/:shortenKey', tinyController.redirect);

module.exports = router;
