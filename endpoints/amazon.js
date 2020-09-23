'use-strict';

const Endpoint = require('./endpoint');

class Amazon extends Endpoint {
    constructor(config) {
        super(config);
        this.name = 'amazon';
        this.options = {
            waitUntil: 'networkidle0',
            domEval: 'Currently unavailable',
            useCookies: true,
        };
    }

    async scan(browser) {
        try {
            console.log(`${Date.now()} | reaching out to ${this._config.urls.length} amazon website(s)`);
            var responses = await super.nav(this.name, browser, this.options);
            var successes = responses.filter((x) => x !== undefined);
            console.log(`${Date.now()} |   ${successes.length} amazon cards found`);
            await super.open(successes);
        } catch (error) {
            console.log(`${Date.now()} | nvidia | nav | exception : ${error}`);
        }
    }
}

module.exports = Amazon;
