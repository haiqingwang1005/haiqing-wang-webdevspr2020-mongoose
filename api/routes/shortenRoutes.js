const express = require('express');
const {check} = require('express-validator');
const shortenController = require('../controller/shortenController');
const router = express.Router();

router.post('/',
    [
        check('original').not().isEmpty(),
    ],
    shortenController.createShortenUrl
);

router.get('/:shortenKey', shortenController.getOriginalUrl);

module.exports = router;