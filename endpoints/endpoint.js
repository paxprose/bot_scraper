'use-strict';

const open = require('open');

class Endpoint { 
    constructor(config){
        this._config = config;
    }

    //params 
    /// browser : object returend from  puppeteer.launch
    /// https://pptr.dev/#?product=Puppeteer&version=v5.3.0&show=api-class-browser
    /// options? : optional, specifies behavior for the page object
    /// options.intercept : array of subsequent requests types to ignore
    /// options.waitUntil : wait condition for page.goto function. 
    ///    see : https://stackoverflow.com/questions/52497252/puppeteer-wait-until-page-is-completely-loaded
    /// options.domEval : object to speicfy individual web dom evluation behavior from page.evaluate() return string
    ///    .exludes : array that specifies text the dom should not have in order to present a positive condition
    async nav(name, browser, options) {
        try {
        
            return Promise.all(this._config.urls.map(async (url) => {
                try {
                    const page = await browser.newPage();

                    //something about this is broken ignoring for now by not passing in any intercept params...
                    //todo debug the stuff between this _if_ statement
                    if(Array.isArray(options.intercept) && options.intercept.length){
                        console.log(`${Date.now()} | options | excluding : ${options.intercept}`);
                        console.log(`note - this might be broken`);
                        await page.setRequestInterception(true);
                        await page.on('request', (req) => {
                            console.log(`req : ${req.resourceType()}`);
                            if(options.intercept.indexOf(req.resourceType()) !== -1){
                                console.log(`${Date.now()} | aborting reqest ${type}`);
                                request.abort();
                            }else{
                                request.continue; 
                            }
                        });
                    }
                    if(Array.isArray(options.headers) && options.headers.length) {
                        for(var i = 0; i <= options.headers.length -1; i++) {
                            await page.setExtraHTTPHeaders(options.headers[i]);
                        }
                    }

                    var res = await page.goto(url, {
                        'waitUntil' : options.waitUntil,
                        'timeout' : 0
                    });
                    var status = await res.status();
                    const dom = await page.evaluate(() => {
                        return {
                            'body' : document.body.innerText
                        }
                    });
                    if(!dom.body.includes(options.domEval) & status == 200){
                        return  {
                            'status' : status,
                            'headers' : await res.headers(),
                            'body' : dom.body,
                            'url' : url
                        };   
                    }
                }catch(error) {
                    console.log(`${Date.now()} | endpoint | nav | Promise.all | exception : ${error} | url : ${url}`);
                }
            }));
        }catch(error){
            console.log(`${Date.now()} | endpoint | nav | exception : ${error}`);
        }
    }

    async open(items) {
        try {
            for(var i = 0; i <= items.length -1; i++){
                console.log(`${Date.now()} | !!! card found -> ${items[i].url}`);
                await open(items[i].url, { app : this._config.default_browser });
            }
        }catch(error) {
            console.log(`${Date.now()} | endpoint | open | exception : ${error}`);
        }
    }
}

 module.exports = Endpoint;