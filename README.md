# Bot Scraper

![GitHub](https://img.shields.io/github/license/paxprose/bot_scraper?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/paxprose/bot_scraper?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

An open sourced scraper that opens a tab to a website when rtx cards are believed to haven been restocked

## Instructions

_note_ : running this behind a vpn is recommended

![visual instructions](./assets/howto.gif)

1. download and install npm: <https://www.npmjs.com/get-npm>

2. clone/download the repo

3. install required dependencies
    - open up a new command terminal and navigate to the folder containing ```index.js```
    - install the dependencies by running the command:

    ```sh
    npm install
    ```

4. start the script

    ```sh
    npm start
    ```

## TODO's

- ~~Only runs once and exits - put it it in a loop with some threadsleep behavior so you don't get locked out~~
  - tossed everything inside of a blocking event loop
- Add more than just nvidia's website
  - ~~bestbuy~~
  - b&h
  - amazon
  - newegg - in progress

### Notes

- _i got banned from the nvidia discord, message me @ paxprose#1644_

## License

All product names, logos, and brands are property of their respective owners. All company, product and service names
used are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.

This software is licensed under the terms of the GNU General Public License version 3 (GPLv3).
Full text of the license is available in the COPYING file and online.
