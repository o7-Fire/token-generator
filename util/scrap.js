const request = require('request');

var scrapeProxies = new Promise((resolve, reject) => {
    request({
        method: "GET",
        url: "https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks5&timeout=10000&country=all",
    }, (error, response, body) => {
        if (body) {
            return resolve(body);
        } else {
            return reject();
        }
    });
});

module.exports = { scrapeProxies };
