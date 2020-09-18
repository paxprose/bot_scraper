'use-strict';
const puppeteer = require('puppeteer');
const config = require('./config/config.json');
const nvidia = require('./endpoints/nvidia');
const bestbuy = require('./endpoints/bestbuy');
var cancel = false; 

(async () => {
    try {
        if(config.debug) { console.log(`${Date.now()} | nvidia card scanner running...`); }
        var endpoints = []; 

        const browser = await puppeteer.launch({ headless : true});
        if(config.nvidia.active) { endpoints.push(nvidia); }
        if(config.bestbuy.active) { endpoints.push(bestbuy); }

        while(!cancel) {            
            
            var cancelAny = await Promise.all(endpoints.map(async (e) => {
                try {
                    return e.nav(browser);
                }catch(error){
                    console.log(`${Date.now()} | generic endpoint router | ex | ${error}`);
                }
            }));

            await sleep(config.refreshrt); 
        }
        await browser.close();
        
    } catch (error) {
    console.log(error);
  }
})();

function sleep(millis) {
    if(config.debug){ console.log(`${Date.now()} | sleeping for : ${millis}`); }
    return new Promise(resolve => setTimeout(resolve, millis));
  }
