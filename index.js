'use-strict';
const puppeteer = require('puppeteer');
const config = require('./config/config.json');
const Nvidia = require('./endpoints/nvidia');
const BestBuy = require('./endpoints/bestbuy');
const Amazon = require('./endpoints/amazon');

var cancel = false;

(async () => {
    try {
        if (config.debug) {
            console.log(`${Date.now()} | nvidia card scanner running...`);
        }
        var endpoints = [];

        if (config.nvidia.active) {
            endpoints.push(new Nvidia(config.nvidia));
        }
        if (config.bestbuy.active) {
            endpoints.push(new BestBuy(config.bestbuy));
        }
        if (config.amazon.active) {
            endpoints.push(new Amazon(config.amazon));
        }
        while (!cancel) {
            //for visual debugging in a web browser you can set headless : false
            const browser = await puppeteer.launch({ headless: true });
            await Promise.all(
                endpoints.map(async (e) => {
                    try {
                        return e.scan(browser);
                    } catch (error) {
                        console.log(`${Date.now()} | generic endpoint router | ex | ${error}`);
                    }
                })
            );
            await browser.close();
            await sleep(config.refreshrt);
        }
    } catch (error) {
        console.log(error);
    }
})();

function sleep(millis) {
    if (config.debug) {
        console.log(`${Date.now()} | sleeping for : ${millis}`);
    }
    return new Promise((resolve) => setTimeout(resolve, millis));
}
