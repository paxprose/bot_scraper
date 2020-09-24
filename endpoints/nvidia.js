'use-strict';

const Endpoint = require('./endpoint');

class Nvidia extends Endpoint {
    constructor(config) {
        super(config);
        this.name = 'nvidia';
        this.options = {
            //'intercept' : ['image', 'stylesheet', 'font'],
            waitUntil: 'networkidle0',
            domEval: ['OUT OF STOCK'],
            useCookies: true,
        };
    }

    ///params
    /// browser : object returend from  puppeteer.launch
    /// https://pptr.dev/#?product=Puppeteer&version=v5.3.0&show=api-class-browser
    async scan(browser) {
        try {
            //wrapper options to clean up some of the verbosity on
            //pupeteer stuff
            console.log(`${Date.now()} | reaching out to ${this._config.urls.length} nvidia website(s)`);
            var responses = await super.nav(this.name, browser, this.options);
            var successes = responses.filter((x) => x !== undefined);
            console.log(`${Date.now()} |   ${successes.length} nvidia cards found`);
            await super.open(successes);
        } catch (error) {
            console.log(`${Date.now()} | nvidia | nav | exception : ${error}`);
        }
    }
}

module.exports = Nvidia;
