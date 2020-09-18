'use-strict';
const puppeteer = require('puppeteer');
const config = require('./config/config.json');
const nvidia = require('./endpoints/nvidia');
var cancel = false; 

(async () => {
    try {
        if(config.debug) { console.log(`${Date.now()} | nvidia card scanner running...`); }
        var endpoints = []; 

        const browser = await puppeteer.launch();
        if(config.nvidia.active) { endpoints.push(nvidia.nav(browser)); }
        
        while(!cancel) {            
            //this doesn't behave the way i thought it would...
            //Promise.all(endpoints);

            await nvidia.nav(browser);
            
            //we'll hit the website at a 
            //reasonable 10 seconds per minute
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
