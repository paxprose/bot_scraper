'use-strict';
const puppeteer = require('puppeteer');
const opn = require('opn');
const config = require('./config/config.json');
/*
instructions via readme


*/
var cancel = false; 
(async () => {
    try {
        if(config.debug) { console.log(`${Date.now()} | nvidia card scanner running...`); }
        const browser = await puppeteer.launch();
        while(!cancel) {
            await nvidia(browser);
            await bestbuy(browser); 
            //we'll hit the website at a 
            //reasonable 10 seconds per minute
            await sleep(config.refreshrt); 
        }
        await browser.close();
        
    }
    catch(error){
        console.log(error); 
    }
})();

function sleep(millis) {
    if(config.debug){ console.log(`${Date.now()} | sleeping for : ${millis}`); }
    return new Promise(resolve => setTimeout(resolve, millis));
  }

async function nvidia(browser) {
    try {
        if(config.debug) { console.log(`${Date.now()} | reaching out to nvidia website @ ${config.nvidia_url}`); }
        const page = await browser.newPage(); 
        await page.goto(
            config.nvidia_url,
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
            opn(config.nvidia_url);
            await page.screenshot({ 
                'path' : `./screenshots/${Date.now()}.png`,
                'fullPage' : true
            });
        }
    }catch(error) {
        console.log(error);
    }
}

async function bestbuy(browser) {
    try {

    }catch(error) {
        console.log(error);
    }
}