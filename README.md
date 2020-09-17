# Bot Scraper

![GitHub](https://img.shields.io/github/license/paxprose/bot_scraper?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/paxprose/bot_scraper?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

An open sourced scraper that opens a tab to nvidia's website when believed to be restocked

## Instructions

![](./assets/howto.gif)

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
    node index.js
    ```

## TODO's

- ~~Only runs once and exits - put it it in a loop w/ some threadsleep behavior so you don't get locked out~~
  - tossed everything inside of a blocking event loop
- Add more than just nvidia's website

### Notes

- _i got banned from the nvidia discord, message me @ paxprose#1644_

## License

This software is licensed under the terms of the GNU General Public License version 3 (GPLv3).
Full text of the license is available in the COPYING file and online.
