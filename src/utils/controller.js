'use-strict';

const { ArgumentParser } = require('argparse');
const { version } = require('../../package.json');
const config = require('../../config/config.json');
const Nvidia = require('../endpoints/nvidia');
const BestBuy = require('../endpoints/bestbuy');
const Amazon = require('../endpoints/amazon');

function controller() {
    const args = options();
    const endpoints = [];

    if (args.nvidia) {
        endpoints.push(new Nvidia(config.nvidia));
    }
    if (args.bestbuy) {
        endpoints.push(new BestBuy(config.bestbuy));
    }
    if (args.amazon) {
        endpoints.push(new Amazon(config.amazon));
    }

    return endpoints;
}

function options() {
    const parser = ArgumentParser({
        description:
            'An open sourced scraper that opens a tab to a website\
             when rtx cards are believed to haven been restocked',
    });

    parser.add_argument('-v', '--version', { action: 'version', version });
    parser.add_argument('--nvidia', { action: 'store_true', default: config.nvidia.active });
    parser.add_argument('--bestbuy', { action: 'store_true', default: config.bestbuy.active });
    parser.add_argument('--amazon', { action: 'store_true', default: config.amazon.active });

    return parser.parse_args();
}

module.exports = controller;
