const crypto = require('crypto');

function hashUrl(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

module.exports = hashUrl;
