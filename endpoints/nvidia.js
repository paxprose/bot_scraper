'use-strict'
const config = require('../config/config.json');
const open = require('open');

//todo : refactor this like in bestbuy.js
//in that the url array's are fired off in parallel

module.exports.nav = async function(browser) {
    try {
        if(config.debug) { console.log(`${Date.now()} | reaching out to nvidia website @ ${config.nvidia.urls[0]}`); }
        const page = await browser.newPage(); 
        await page.goto(
            config.nvidia.urls[0],
            {
                'waitUntil' : 'networkidle0'
            });

        const dom = await page.evaluate(() => {
            return {
                'body' : document.body.innerText
            }
        });

        if(!dom.body.includes('OUT OF STOCK')){
            console.log(dom.body);
            console.log(`${Date.now()} | nvidia in stock detected...opening browser`);
            await open(config.nvidia.urls[0], { app : config.default_browser });
            await page.screenshot({ 
                'path' : `./screenshots/${Date.now()}.png`,
                'fullPage' : true
            });
        }
        return 0;
    }catch(error) {
        console.log(`${Date.now()} | nvidia | nav | exception : ${error}`);
    }
}