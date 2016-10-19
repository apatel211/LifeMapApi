var bootstrap = require('./bootstrap');
var request = require('supertest-as-promised');
var settings = bootstrap.settings;
var XMLParser = require('xmldom').DOMParser;
var log = bootstrap.log;
var wd = require('wd');
var fs = require('fs');
var moment = require('moment');
var assert = require('assert');
var log = bootstrap.log;
var resultsXmlFile;
var browser;
var TheAPI = request(settings.qtest.apiurl);

var authkey2= "bW9iaXF1aXR5fGFwYXRlbEBtb2JpcXVpdHlpbmMuY29tOjE0NTkyMzUyNjI1NDU6ZDkwOTJjNTUyMTg1OTk3ZDhhMWI5MTkzZGRiZGMyY2U";
var browser = wd.promiseChainRemote("0.0.0.0", 4723);
var Connect = function(theBrowser) {
    log.info("Creating Tour Page object");

    this.browser = theBrowser;
    browser = theBrowser;
};

 Connect.prototype.Login= function(done) {
    TheAPI
    .post('/login')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Cache-Control', 'no-cache')
    .send({
        'j_username': settings.qtest.username,
        'j_password': settings.qtest.password,
         })
    .expect(200)
    .end(function(err, res) {
        if(err) {
            log.error("Problem logging into qtest: " + err);
            return;
        }
        console.log("Successfully login");
        authkey = res.text;
        done();
    });
}

Connect.prototype.GetTestRuns= function(done){
    TheAPI
        .get('/v3/projects/' + settings.qtest.projectid + '/test-suites/' + 
            settings.qtest.regressionsuiteid + '/test-runs')
        .set('Authorization', authkey)
        .send()
        .expect(200)
        .end(function(err, res) {
            if(err) {
                log.error("Problem getting test project and regressionsuite ids: " + err);
                done(err);
            }
            var testruns = res.body;
            for(var i = 0; i < testruns.length; i++) {
                var run = testruns[i];
                testrunids[run.name] = run.id;
            }

            console.log("Successfully get data");
            console.log("Result from qtest: " + JSON.stringify(testrunids, null, 4));
            done();
        });
}

Connect.prototype.UploadResultToQTest2=function( name ,runid ,startdate ,enddate ,failMessage, done) {
//failMessage is condition for conditional operator (a==b)? yes : no 

    var testdata = {
            'exe_start_date': startdate,
            'exe_end_date': enddate,
            'status': failMessage  ? "PASS" : "FAIL",
            'class_name': name,
            'Time' : new Date(),
            'note': failMessage ? "Testcase is passed" : "Testcase is failed"
            //'note': "Time: " + time + " -- " + failMessage ? message + " : " + failMessage : message
             };

    console.log(JSON.stringify(testdata, null, 4));

    TheAPI
        .post('/v3/projects/' + settings.qtest.projectid + '/test-runs/' + runid + '/auto-test-logs')
        .set('Authorization', authkey2)
        .set('Content-Type', 'application/json')
        .send(testdata)
        .expect(201)
        .end(function(err,res,testdata) {
            log.info('Test2: Response code: '+res.statusCode);
                log.info('Test2: Response: \n'+JSON.stringify(res.body, null, 2));
                if(res.statusCode==201) {
                    status ="PASS";
                    log.info("The test passed..!!!");
                 }else{
                    status ="FAIL";
                    log.info("As one of the test-case failed");
                }
            log.info("status of the charter is...: " + status);
            assert.equal(res.statusCode,201);
            assert.notEqual(0, res.length);
            done(); 
        });
}

module.exports = Connect;