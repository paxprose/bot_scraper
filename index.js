/*v.0.1.1 */

'use-strict';
const puppeteer = require('puppeteer');
const PuppeteerHar = require('puppeteer-har'); 
const opn = require('opn');

/*
instructions : 

Step 1 - make sure you have npm installed : https://www.npmjs.com/get-npm
Step 1.2 - copy the contents of this file into a new file somewhere called "index.js"

Step 2 - you have to install all the bullshit this thing needs in order to run 
  - so open up a new command terminal and naviagte to whatever folder you put the .index.js file into
  - # npm i opn
  - # npm i puppeteer
  - # npm i puppeteer-har

Step 3 - make the other folders you need to keep things tidy
  - # mkdir screenshots
  - # mkdir har

Step 4 - see if you can run the thing 
  - # node index.js
*/
(async () => {
    try {
        const browser = await puppeteer.launch();
        await nvidia(browser);
    }
    catch(error){
        console.log(error); 
    }
})();

async function nvidia(browser) {
    try {
        const page = await browser.newPage(); 
        const har = new PuppeteerHar(page); 
        await har.start({ 'path' : `./har/${Date.now()}.har`});
    
        await page.goto(
            'https://www.nvidia.com/en-us/shop/geforce/?page=1&limit=1&locale=en-us&gpu=RTX%203080&gpu_filter=RTX%203080',
            {
                'waitUntil' : 'networkidle0'
            });
        const dom = await page.evaluate(() => {
            return {
                'body' : document.body.innerText
            }
        });
        if(!dom.body.includes('OUT OF STOCK')){
            console.log('Out of stock not detected - buy?');
            opn('https://www.nvidia.com/en-us/shop/geforce/?page=1&limit=1&locale=en-us&gpu=RTX%203080&gpu_filter=RTX%203080');
            await page.screenshot({ 
                'path' : `./screenshots/${Date.now()}.png`,
                'fullPage' : true
            });
        }

        await har.stop(); 
        await browser.close();
    }catch(error) {
        console.log(error);
    }
}