'use-strict';

const Endpoint = require('./endpoint');

class Amazon extends Endpoint {
    constructor(config) {
        super(config);
        this.name = 'amazon';
        this.options = {
            headers: [
                ['Accept', `*/*`],
                ['Accept-Encoding', 'gzip, deflate, br'],
                ['Connection', 'keep-alive'],
                ['rtt', '50'],
                ['downlink', '10'],
                ['rtt', '50'],
                ['ect', '4g'],
                [
                    'Accept',
                    `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
                ],
                [
                    'User-Agent',
                    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36`,
                ],
            ],
            waitUntil: 'networkidle0',
            domEval: ['Currently unavailable'],
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
