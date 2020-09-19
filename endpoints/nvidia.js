'use-strict'
const config = require('../config/config.json');
const open = require('open');

module.exports.nav = async function(browser) {
    try {
        return Promise.all(config.bestbuy.urls.map(async (url) => {
            if(config.debug) { console.log(`${Date.now()} | reaching out to nvidia website @ ${url}`); }
            const page = await browser.newPage(); 

            await page.setRequestInterception(true);
            await page.on('request', async (request) => {
                if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
                    request.abort();
                } else {
                    request.continue();
                }
            });
            
            await page.goto(
                url,
                {
                    'waitUntil' : 'networkidle0'
                });

            const dom = await page.evaluate(() => {
                return {
                    'body' : document.body.innerText
                }
            });
            if(!dom.body.includes('Out Of Stock')){
                console.log(`${Date.now()} | nvidia in stock detected...opening browser`);
                await open(url, { app : config.default_browser });
                await page.screenshot({ 
                    'path' : `./screenshots/${Date.now()}.png`,
                    'fullPage' : true
                });
                return 0;
            }
        }));
    }catch(error) {
        console.log(`${Date.now()} | nvidia | nav | exception : ${error}`);
    }
}