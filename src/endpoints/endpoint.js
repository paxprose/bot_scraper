'use-strict';

const cookiemanager = require('../../cookies/cookiemanager');
const open = require('open');

class Endpoint {
    constructor(config) {
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
    /// options.exludes : array that specifies text the dom should not have in order to present a positive condition
    async nav(name, browser, options) {
        try {
            return Promise.all(
                this._config.urls.map(async (url) => {
                    try {
                        const page = await browser.newPage();
                        if (Array.isArray(options.headers) && options.headers.length) {
                            await page.setExtraHTTPHeaders(...options.headers);
                        }

                        if (options.useCookies) {
                            var exists = await cookiemanager.exists(url);
                            if (exists) {
                                var cookies = await cookiemanager.fetch(url);
                                await page.setCookie(...cookies);
                            }
                        }

                        var res = await page.goto(url, {
                            waitUntil: options.waitUntil,
                            timeout: 0,
                        });
                        var status = await res.status();
                        const dom = await page.evaluate(() => {
                            return {
                                body: document.body.innerText,
                            };
                        });

                        if (options.useCookies) {
                            var cookies = await page.cookies();
                            await cookiemanager.replace(url, cookies);
                        }

                        var evaluations = [];
                        for (var i = 0; i <= options.domEval.length - 1; i++) {
                            evaluations.push(!dom.body.includes(options.domEval[i]) & (status == 200));
                            if (evaluations[i] == false) {
                                break;
                            }
                        }
                        if (!evaluations.some((e) => e == 0)) {
                            // console.log(JSON.stringify({
                            //     status: status,
                            //     headers: await res.headers(),
                            //     body: dom.body,
                            //     url: url,
                            // }));
                            return {
                                status: status,
                                headers: await res.headers(),
                                body: dom.body,
                                url: url,
                            };
                        }
                    } catch (error) {
                        console.log(
                            `${Date.now()} | endpoint | nav | Promise.all | exception : ${error} | url : ${url}`
                        );
                    }
                })
            );
        } catch (error) {
            console.log(`${Date.now()} | endpoint | nav | exception : ${error}`);
        }
    }

    async open(items) {
        try {
            for (var i = 0; i <= items.length - 1; i++) {
                console.log(`${Date.now()} | !!! card found -> ${items[i].url}`);
                await open(items[i].url, { app: this._config.default_browser });
            }
        } catch (error) {
            console.log(`${Date.now()} | endpoint | open | exception : ${error}`);
        }
    }
}

module.exports = Endpoint;
