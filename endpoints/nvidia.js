'use-strict'
const config = require('../config/config.json');
const open = require('open');

module.exports.nav = async function(browser) {
    try {
        if(config.debug) { console.log(`${Date.now()} | reaching out to nvidia website @ ${config.nvidia.urls[0]}`); }
        const page = await browser.newPage(); 
        await page.goto(
            config.nvidia.urls[0],
            {
                'waitUntil' : 'networkidle0'
            });
        await page.on('response', response => {
            if(config.debug) { console.log(`${Date.now()} | response : ${response.status()}`); }
            if (response.status() !== 200) {
                console.log(`${Date.now()} | non 200 status returned. exiting.`);
                cancel = true;
                }});
        const dom = await page.evaluate(() => {
            return {
                'body' : document.body.innerText
            }
        });
        if(!dom.body.includes('OUT OF STOCK')){
            cancel = true; 
            console.log(`${Date.now()} | in stock detected...`);
            await open(config.nvidia.urls[0], { app : config.default_browser });
            await page.screenshot({ 
                'path' : `./screenshots/${Date.now()}.png`,
                'fullPage' : true
            });
        }
    }catch(error) {
        console.log(`${Date.now()} | Nvidia | nav | exception : ${error}`);
    }
}