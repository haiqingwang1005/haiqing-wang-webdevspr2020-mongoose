const Mapping = require('../model/mappingSchema');
const HttpError = require('../model/httpError');

const redirect = async (req, res, next) => {
    const shortenKey = req.params.shortenKey;
    console.log(shortenKey);
    const mapping = await Mapping.findOne({shortenKey});
    if (mapping) {
        const original = mapping.original;
        console.log(original);
        res.redirect(302, original);
    } else {
        return next(new HttpError('Cannot find tiny url', 404));
    }

};

exports.redirect = redirect;
