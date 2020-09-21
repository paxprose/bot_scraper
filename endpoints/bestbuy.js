'use-strict'
const config = require('../config/config.json');
const open = require('open');


module.exports.nav = async function(browser) {
    try {
        return Promise.all(config.bestbuy.urls.map(async (url) => {
            try {
                if(config.debug) { console.log(`${Date.now()} | reaching out to bestbuy website @ ${url}`); }
                const page = await browser.newPage(); 
                await page.setExtraHTTPHeaders(
                    ['DNT', '1'],
                    ['Upgrade-Insecure-Requests', '1'],
                    ['User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'],
                    ['Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9']
                 );
                 await page.setRequestInterception(true);
                 await page.on('request', async (request) => {
                     if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
                         request.abort();
                     } else {
                         request.continue();
                     }
                 });
                
                //the full dom evaluation takes > 30 seconds
                //which sucks - it means folks probably wouldn't benifit from this too much
                //on the upside it is checking each url independantly...
                await page.goto(url,
                    {
                        'waitUntil' : 'domcontentloaded',
                        'timeout' : 0
                    });

                const dom = await page.evaluate(() => {
                    return {
                        'body' : document.body.innerText
                    }
                });
                if(!dom.body.includes('Sold Out')){
                    console.log(`${Date.now()} | bestbuy in stock detected...`);
                    await open(url, { app : config.default_browser });
                    await page.screenshot({ 
                        'path' : `./screenshots/${Date.now()}.png`,
                        'fullPage' : true
                    });
                    return 0;
                }
            }catch(error) {
                console.log(`${Date.now()} | bestbuy | nav | Promise.all | ex | ${error}`); 
            }
        }));
    }catch(error) {
        console.log(`${Date.now()} | bestbuy | nav | ex | ${error}`); 
    }
}