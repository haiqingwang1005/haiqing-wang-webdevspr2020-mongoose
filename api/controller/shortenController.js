const {validationResult} = require('express-validator');
const validUrl = require('valid-url');

const HttpError = require('../model/httpError');

const tinyService = require('../service/tinyService');

const getOriginalUrl = async (req, res, next) => {
    const shortenKey = req.params.shortenKey;
    const original = await tinyService.getOriginalUrl(shortenKey);
    if (original) {
        res.status(200).json({original});
    } else {
        return next(new HttpError('Cannot find tiny url', 404));
    }
};

const createShortenUrl = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Input', 400));
    }
    const {original, index} = req.body;
    if (!validUrl.isUri(original)) {
        return next(new HttpError('Invalid Url', 400));
    }

    let tinyUrl;
    if (index && index.length > 0) {
        // Branded URL Shorten.
        try {
            tinyUrl = await tinyService.createBrandedTinyUrl(original, index);
        } catch (e) {
            console.log(e);
            return next(e);
        }
    } else {
        // Unbranded URL Shorten.
        try {
            tinyUrl = await tinyService.createUnbrandedTinyUrl(original);
        } catch (e) {
            return next(e);
        }
    }

    res.status(200).json({
        tinyUrl: tinyUrl
    });
};

exports.createShortenUrl = createShortenUrl;
exports.getOriginalUrl = getOriginalUrl;