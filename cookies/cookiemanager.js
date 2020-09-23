'use-strict'; 

const fs = require('fs'); 
const promisfy = require('util').promisify;
var crypto = require('crypto');


const fileExistsAsync = promisfy(fs.exists); 
const readFileAsync = promisfy(fs.readFile); 
const writeFileAsync = promisfy(fs.writeFile); 

module.exports.exists = async(url) => {
    try {
        var md5 = crypto.createHash('md5');
        var hash = md5.update(url).digest('hex');
        var path = `./cookies/tmp/${hash}.json`;
        return await fileExistsAsync(path);
    }catch(error) {
        console.log(`${Date.now()} | cookiemanager | exists | exception : ${error}`);
    }
}

module.exports.fetch = async(url) => {
    try {
        var md5 = crypto.createHash('md5');
        var hash = md5.update(url).digest('hex');
        var path = `./cookies/tmp/${hash}.json`;
        var cookies = await readFileAsync(path, 'utf8');
        return JSON.parse(cookies);

    }catch(error) {
        console.log(`${Date.now()} | cookiemanager | fetch | exception : ${error}`);
    }
}

module.exports.replace = async(url, cookies) => {
    try {
        var md5 = crypto.createHash('md5');
        var hash = md5.update(url).digest('hex');
        var path = `./cookies/tmp/${hash}.json`;
        await writeFileAsync(path, JSON.stringify(cookies, null, 2));

    }catch(error) {
        console.log(`${Date.now()} | cookiemanager | replace | exception : ${error}`);
    }
}