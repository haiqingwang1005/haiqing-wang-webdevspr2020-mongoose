const Mapping = require('../model/mappingSchema');

const redirect = async (req, res, next) => {
    const shortenKey = req.params.shortenKey;
    console.log(shortenKey);
    const mapping = await Mapping.findOne({shortenKey});
    const original = mapping.original;
    console.log(original);
    res.redirect(302, original);
};

exports.redirect = redirect;
