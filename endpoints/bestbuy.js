'use-strict'
const Endpoint = require('./endpoint');

class BestBuy extends Endpoint{
    constructor(config) {
        super(config);
        this.name = 'bestbuy';
        this.options = {
                'headers' : [                    
                    ['DNT', '1'],
                    ['Upgrade-Insecure-Requests', '1'],
                    ['User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'],
                    ['Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9']
                ],
                'waitUntil' : 'domcontentloaded',
                'domEval' :  'Sold Out'
            };
    }

    async scan(browser) {
        try {
            console.log(`${Date.now()} | reaching out to ${this._config.urls.length} bestbuy website(s)`); 
            var responses = await super.nav(this.name, browser, this.options);
            var successes = responses.filter((x) => x !== undefined); 
            console.log(`${Date.now()} |   ${successes.length} bestbuy cards found`);
            await super.open(successes); 
        }catch(error){
            console.log(`${Date.now()} |  bestbuy | nav | exception : ${error}`);
        }
    }
}

module.exports = BestBuy;
