const Mapping = require('../model/mappingSchema');
const Urls = require('../model/urlSchema');
const HttpError = require('../model/httpError');
const hashUrl = require('../utils/hash');
const shortid = require('shortid');

const host = process.env.LOCAL_HOST;

async function isUrlInUrlDocument(longUrl, shortenKey) {
    const hash = hashUrl(longUrl);
    let obj = await Urls.findOne({dataIndex: hash});
    if (obj) {
        for (let i = 0; i < obj.urls.length; i++) {
            const item = obj.urls[i];
            if (item.url === longUrl && item.shortenKey === shortenKey) {
                return true;
            }
        }
    }
    return false;
}

async function addUrlToUrlDocument(longUrl, shortenKey) {
    const hash = hashUrl(longUrl);
    console.log(hash);

    let obj = await Urls.findOne({dataIndex: hash});
    if (obj) {
        // Iterate list to find if duplicate.
        for (let i = 0; i < obj.urls.length; i++) {
            const item = obj.urls[i];
            if (item.url === longUrl) {
                return {
                    key: item.shortenKey,
                    needStore: false
                };
            }
        }
        obj.urls.push({url: longUrl, shortenKey});
        await Urls.updateOne({dataIndex: hash}, {urls: obj.urls});
    } else {
        const newUrl = new Urls({
            dataIndex: hash,
            urls: [{url: longUrl, shortenKey: shortenKey}]
        });
        await newUrl.save();
    }
    return {
        key: shortenKey,
        needStore: true,
    };
}

// Remove the longUrl and its key from Urls documents. If the pair doesn't exit, do nothing.
async function removeUrlFromUrlDocument(longUrl, shortenKey) {
    const hash = hashUrl(longUrl);
    const urlsObj = await Urls.findOne({dataIndex: hash});
    console.log('remove from url doc ' + longUrl );
    console.log('remove key: ' + shortenKey);
    if (urlsObj) {
        const urlList = urlsObj.urls;
        let index = undefined;
        for (let i = 0; i < urlList.length; i++) {
            const item = urlList[i];
            if (item.url === longUrl && item.shortenKey === shortenKey) {
                index = i;
                break;
            }
        }

        if (index !== undefined) {
            urlList.splice(index, 1);
            console.log(urlList);
            await Urls.updateOne({dataIndex: hash}, {urls: urlList});
        }
    }
}

async function createBrandedTinyUrl(original, index) {

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

    try {
        const candidateKey = await getShortId();
        const shortenKeyObj = await addUrlToUrlDocument(original, candidateKey);
        const shortenKey = shortenKeyObj.key;
        if (shortenKeyObj.needStore) {
            const createdMapping = new Mapping({
                original: original,
                shortenKey: shortenKey
            });
            await createdMapping.save();
        }
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

async function updateOriginalUrl(newUrl, shortenKey) {
    console.log(shortenKey);
    const mapping = await Mapping.findOne({shortenKey});
    if (!mapping) {
        throw new HttpError(
            "Tiny Url doesn\'t exist",
            404
        );
    }
    const oldUrl = mapping.original;
    console.log('oldurl ' + oldUrl);
    console.log('newUrl ' + newUrl);

    // Update mapping document.
    await Mapping.updateOne({shortenKey}, {original: newUrl});

    // If the shortenKey and oldUrl is in URL documents, which means it is unbranded.
    if (await isUrlInUrlDocument(oldUrl, shortenKey)) {
        // Update urls document.
        //Remove old url document.
        await removeUrlFromUrlDocument(oldUrl, shortenKey);

        //Add new url document.
        await addUrlToUrlDocument(newUrl, shortenKey);
    }
    return {
        tinyUrl: host + shortenKey,
        longUrl: newUrl,
    }
}

async function deleteUrl(shortenKey) {
    const mapping = await Mapping.findOne({shortenKey});
    if (!mapping) {
        throw new HttpError(
            "Tiny Url doesn\'t exist",
            404
        );
    }
    const longUrl = mapping.original;

        // Delete the mapping document.
    await Mapping.deleteOne({shortenKey});

    // Delete the url document
    await removeUrlFromUrlDocument(longUrl, shortenKey);
}

exports.createBrandedTinyUrl = createBrandedTinyUrl;
exports.createUnbrandedTinyUrl = createUnbrandedTinyUrl;
exports.getOriginalUrl = getOriginalUrl;
exports.updateOriginalUrl = updateOriginalUrl;
exports.deleteUrl = deleteUrl;