const proxyChecker = require('proxy-checker');
const { scrapeProxies } = require('./util/scraper.js');
var anticaptcha = require('./anticaptcha')('tokenhere'); //<<< your anticaptcha token

var fs = require('fs');
var proxies = [];

anticaptcha.setWebsiteURL("https://discord.com/register");
anticaptcha.setWebsiteKey("6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn");
anticaptcha.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36");


anticaptcha.getBalance(function (err, balance) {
    if (err) {
        console.error(err);
        return;
    }

    if (balance > 0) {
        anticaptcha.createTaskProxyless(function (err, taskId) {
            if (err) {
                console.error(err);
                return;
            }

            console.log(taskId);

            anticaptcha.getTaskSolution(taskId, function (err, taskSolution) {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log(taskSolution);
				  fs.writeFile('1234.txt', taskSolution, function(err) {
					});
            });
        });
    }
	//snig
scrapeProxies.then(fetched => {
    fs.writeFile('util/proxies.txt', fetched, (err) => {
        if (err) throw err;
        proxyChecker.checkProxiesFromFile('Source/proxies.txt', {
            url: 'https://discord.com',
            regex: /It's time to ditch Skype and TeamSpeak./
        }, (host, port, ok, statusCode, err) => {
            if (ok) proxies.push(`${host}:${port}`);
        });
    });
    console.log(`Checking ${fetched.length} proxies!`);
}).catch(err => {
    proxyChecker.checkProxiesFromFile('util/proxies.txt', {
        url: 'https://discord.com',
        regex: /It's time to ditch Skype and TeamSpeak./
    }, (host, port, ok, statusCode, err) => {
        if (ok) proxies.push(`${host}:${port}`);
    });
    console.log(`Checking proxies from proxies.txt!`);
});

});

