const Mapping = require('../model/mappingSchema');
const Urls = require('../model/urlSchema');
const HttpError = require('../model/httpError');
const hashUrl = require('../utils/hash');
const shortid = require('shortid');


async function createBrandedTinyUrl(original, index) {
    const host = process.env.LOCAL_HOST;

    let mapping = await Mapping.findOne({shortenKey: index});
    if (mapping) {
        if (mapping.original === original) {
            return host + index;
        }
        throw new HttpError('Customized Branded URL already exist', 409);
    } else {
        const createdMapping = new Mapping({
            original: original,
            shortenKey: index
        });

        try {
            await createdMapping.save();
            return host + index;
        } catch (e) {
            throw new HttpError(
                'Creating Url failed',
                500
            );
        }
    }
}

// Make sure the short id never collision. If it does, re-generate.
async function getShortId() {
    while (true) {
        const shortenKey = shortid.generate();
        const mapping = await Mapping.findOne({shortenKey});
        if (!mapping) {
            return shortenKey;
        }
    }
}

async function createUnbrandedTinyUrl(original) {
    const host = process.env.LOCAL_HOST;

    const hash = hashUrl(original);
    console.log(hash);

    try {
        let obj = await Urls.findOne({dataIndex: hash});
        let shortenKey;
        if (obj) {
            // Iterate list to find if duplicate.
            for (let i = 0; i < obj.urls.length; i++) {
                const item = obj.urls[i];
                if (item.url === original) {
                    return host + item.shortenKey;
                }
            }
            shortenKey = await getShortId();
            obj.urls.push({url: original, shortenKey});
            await Urls.updateOne({dataIndex: hash}, {urls: obj.urls});
        } else {
            shortenKey = await getShortId();
            const newUrl = new Urls({
                dataIndex: hash,
                urls: [{url: original, shortenKey: shortenKey}]
            });
            await newUrl.save();
        }

        const createdMapping = new Mapping({
            original: original,
            shortenKey: shortenKey
        });
        await createdMapping.save();
        return host + shortenKey;
    } catch (e) {
        console.error(e);
        throw new HttpError(
            'Creating Url failed',
            500
        );
    }
}

async function getOriginalUrl(shortenKey) {
    const mapping = await Mapping.findOne({shortenKey});
    if (mapping) {
        return mapping.original;
    }
    return null;
}

exports.createBrandedTinyUrl = createBrandedTinyUrl;
exports.createUnbrandedTinyUrl = createUnbrandedTinyUrl;
exports.getOriginalUrl = getOriginalUrl;