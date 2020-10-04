'use-strict';

const config = require('../../config/config.json');

function sleep(millis) {
    if (config.debug) console.log(`${Date.now()} | sleeping for : ${millis}`);
    return new Promise((resolve) => setTimeout(resolve, millis));
}

module.exports = sleep;
