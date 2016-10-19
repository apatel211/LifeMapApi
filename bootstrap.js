var wd = require('wd');
var fs = require('fs');
var chai = require("chai");
require("colors");
var Settings = require('./testenvironment');
var chaiAsPromised = require("chai-as-promised");

//exports.should = require("should");

chai.use(chaiAsPromised);
//chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

exports.log = require('custom-logger').config({ level: Settings.loglevelmin });
exports.log.info().config({ color: 'green', format: '%event% - %message%' });
exports.MaxWaitTime = Settings.maxwaittime;

exports.writeToFile = function(content) {
    fs.appendFile(Settings.resultsFile, content + "\n\n", function(err) {
        if(err) {
            exports.log.warn(err);
        } else {
            exports.log.info("The test link file was saved!");
        }
    }); 
}

exports.HandleErrors = function(itDidNotWorkCB, itWorkedCB) {
    return function (err, other) {
        if (err) {
            itDidNotWorkCB("oops" + err);
        } else {
            itWorkedCB(null, other);
        }
    }
}

fs.unlink(Settings.resultsFile, function(err) {
    if(err) {
        exports.log.warn(err);
    } else {
        exports.log.info("The test link file was removed!");
    }
});

exports.settings = Settings;
exports.writeToFile("Sauce Test Reults");

