'use-strict';
const puppeteer = require('puppeteer');
const config = require('./config/config.json');
const nvidia = require('./endpoints/nvidia');
const bestbuy = require('./endpoints/bestbuy');
const newegg = require('./endpoints/newegg');
const amazon = require('./endpoints/amazon'); 

var cancel = false; 

(async () => {
    try {
        if(config.debug) { console.log(`${Date.now()} | nvidia card scanner running...`); }
        var endpoints = []; 

        if(config.nvidia.active) { endpoints.push(nvidia); }
        if(config.bestbuy.active) { endpoints.push(bestbuy); }
        if(config.newegg.active) { endpoints.push(newegg); }
        if(config.amazon.active) { endpoints.push(amazon); }
        while(!cancel) {            
            const browser = await puppeteer.launch({ headless : true});
            await Promise.all(endpoints.map(async (e) => {
                try {
                    return e.nav(browser);
                }catch(error){
                    console.log(`${Date.now()} | generic endpoint router | ex | ${error}`);
                }
            }));
            await browser.close();
            await sleep(config.refreshrt); 
        }
        
        
    } catch (error) {
    console.log(error);
  }
})();

function sleep(millis) {
    if(config.debug){ console.log(`${Date.now()} | sleeping for : ${millis}`); }
    return new Promise(resolve => setTimeout(resolve, millis));
  }
