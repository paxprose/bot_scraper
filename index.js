'use-strict';

const puppeteer = require('puppeteer');
const config = require('./config/config.json');
const controller = require('./src/utils/controller');
const sleep = require('./src/utils/sleep');
const shutdown = require('./src/utils/shutdown');

var cancel = false;

(async () => {
    try {
        const endpoints = controller();

        if (config.debug) {
            console.log(`${Date.now()} | nvidia card scanner running...`);
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
            await sleep(config.refresh_rate);
        }
    } catch (error) {
        console.log(error);
    }
})();

process.on('SIGINT', shutdown);
