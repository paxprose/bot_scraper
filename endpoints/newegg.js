/*'use-strict';

const config = require('../config/config.json');
const open = require('open'); 

//this one works a little differently
//i had to track a subcall into newegg's "LandingPage" endpoint
//that ended up having a really convenient json payload we can use. 
//we can just rebuild the product's url from the beforementioned json payload.
module.exports.nav = async function(browser) {
    try {
        
        return Promise.all(config.newegg.urls.map(async (url) => {
            try {
                if(config.debug) { console.log(`${Date.now()} | reaching out to newegg website @ ${url}`); }
                const page = await browser.newPage();

                await page.goto(url,
                    {
                        'waitUntil' : 'networkidle0'
                    });
                const dom = await page.evaluate(() => {
                    return {
                        'body' : document.body.innerText
                    }
                });
                var matches = dom.body.toString().match(new RegExp('"mainItem":' + '(.*)'));
                if(matches != null){
                    var raw = matches[1]; 
                    var data = JSON.parse(raw.substr(0, raw.length - 2));
                    if(data.instock){
                        console.log(`${Date.now()} | newegg in stock detected...opening browser`);
                        await open(`https://newegg.com/${data.urlKeywords}/p/${data.neweggItemNumber}`);
                        return 0;
                    }
                }else{
                    console.log(`${Date.now()} | newegg regex match not found @ ${url} | expand the timeout or disallow newegg in the config.json`);
                }

            }catch(error) {
        console.log(`${Date.now()} | newegg | nav | Promise.all | ex | ${error}`); 
    }
    }));


    }catch(error) {
        console.log(`${Date.now()} | newegg | nav | ex | ${error}`); 
    }
}
*/
