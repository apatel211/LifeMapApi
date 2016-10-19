var bootstrap = require('../bootstrap');
var request = require('supertest-as-promised');
var settings = bootstrap.settings;
var XMLParser = require('xmldom').DOMParser;
var log = bootstrap.log;
var wd = require('wd');
var fs = require('fs');
var moment = require('moment');
var connect = require('../Connect');
var assert = require('assert');

var date = new Date();
var log = bootstrap.log;
var resultsXmlFile;
var browser;
var TheAPI = request(settings.qtest.apiurl);
var Testurl = request(settings.local.path);
var authkey = "Basic N2I1YTM4NzA1ZDdiMzU2MjY1NTkyNTQwNmE2NTJlMzI6NjU1ZjUyMzEyODIxMmQ2ZTcwNjM0NDQ2MjI0YzJhNDg=";
var Usernameforlogin = "ankitanew@mobiquityinc.com";
var passwordforlogin = "Password@2";

var randomnumber=Math.floor(Math.random()*1212223311)
var EmpNum ;
var authtoken;
var authtokenandtype; 

describe('Lifemap api', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator

    var exe_start_date = new moment.utc().format();
    console.log("start date " + exe_start_date);
    connect = new connect(browser);

    it('should return login using outh', function(done) {
        console.log("<------------------------------TESTCASE-login------------------------------>");
        testCaseId = 998021;
        Testurl
          //.get('/groupadmin-1.0.2/api/user/login?grant_type=password&username='+Usernameforlogin+'&password='+passwordforlogin)
          .get('/groupadmin-1.0.2/api/user/login?grant_type=password&username=ankitap@mobiquityinc.com&password=Password1@')
          .set('Content-Type','application/json')
          .set('Authorization',authkey)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test: Response code: '+res.statusCode);
                log.info('Test: Response: \n'+ JSON.stringify(res.body, null, 2));

                authtoken = res.body.access_token;
                console.log("Token is "+ authtoken);
                authtokenandtype =("Bearer "+ authtoken);
                console.log(authtokenandtype);

                if(res.statusCode==200) {
                    status ="PASS";
                    log.info("The test passed..!!!");
                 }else{
                    status ="FAIL";
                    log.info("As one of the test-case failed");
                }
            log.info("status of the charter is...: " + status);
            assert.equal(res.statusCode, 200);
            assert.notEqual(0, res.length);
            done();
        });
    })
   
    it('should invite primary/seconday admin, validation message for same user or repeat user with status 404', function(done) {
        console.log("<------------------------------TESTCASE-1------------------------------>");
        testCaseId = 998025;
        Testurl
          .post('/groupadmin-1.0.2/api/user/invite')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "email":"apatel50@mobiquityinc.com",
                "role":"SecondaryAdmin",
                "divisions": [ {"id":"0000"}],
                "firstName":"sneha",
                "lastName":"shah",
                "mobile":"9979039016",
                "ssn":"9999"
          })
          .expect(404)
          .end(function(err, res) {
                log.info('Test1: Response code: '+res.statusCode);
                log.info('Test1: Response: \n'+JSON.stringify(res.body, null, 2));
                if(res.statusCode==404) {
                    status ="PASS";
                    log.info("The test passed..!!!");
                 }else{
                    status ="FAIL";
                    log.info("As one of the test-case failed");
                }
            log.info("status of the charter is...: " + status);
            assert.equal(res.statusCode,404);
            assert.notEqual(0, res.length);
            done();
        });
    })

    it('should register manually, validation message using the requested user was not found status 409', function(done) {
        console.log("<------------------------------TESTCASE-2------------------------------>");
        testCaseId = 1034601;
        Testurl
          .post('/groupadmin-1.0.2/api/user/register?userid=YXBhdGVsKzI1QG1vYmlxdWl0eWluYy5jb20=')
          .set('Content-Type','application/json')
          .send({
                "firstName": "sneha",
                "lastName": "shah",
                "mobile": "9974730245",
                "userName": "sshah@mobiquityinc.com", 
                "email": "sshah@mobiquityinc.com",
                "password":"abcdA1@",
                "confirmPassword":"abcdA1@",
                "ssn":"9999"
          })
          .expect(404)
          .end(function(err, res) {
                log.info('Test2: Response code: '+res.statusCode);
                log.info('Test2: Response: \n'+JSON.stringify(res.body, null, 2));
                if(res.statusCode==404) {
                    status ="PASS";
                    log.info("The test passed..!!!");
                 }else{
                    status ="FAIL";
                    log.info("As one of the test-case failed");
                }
            log.info("status of the charter is...: " + status);
            assert.equal(res.statusCode, 404);
            assert.notEqual(0, res.length);
            done();
        });
    })
   
    it('should return login using outh,validation message with bad credintials status 400', function(done) {
        console.log("<------------------------------TESTCASE-3------------------------------>");
        testCaseId = 998021;
        Testurl
          //.get('/groupadmin-1.0.2/api/user/login?grant_type=password&username='+Usernameforlogin+'&password='+passwordforlogin)
          .get('/groupadmin-1.0.2/api/user/login?grant_type=password&username=a2@mobiquityinc.com&password=Password2@')          .set('Content-Type','application/json')
          .set('Authorization',authkey)
          .send()
          .expect(400)
          .end(function(err, res) {
                log.info('Test3: Response code: '+res.statusCode);
                log.info('Test3: Response: \n'+JSON.stringify(res.body, null, 2));
                if(res.statusCode==400) {
                    status ="PASS";
                    log.info("The test passed..!!!");
                 }else{
                    status ="FAIL";
                    log.info("As one of the test-case failed");
                }
            log.info("status of the charter is...: " + status);
            assert.equal(res.statusCode, 400);
            assert.notEqual(0, res.length);
            done();
        });
    })

  afterEach(function(done){
        log.warn("the value of status is....: "+ status);
        log.info("you are able to login in qtest, pass!!!");
        var exe_end_date = new moment.utc().format();
        console.log("end date " + exe_end_date);
            connect.UploadResultToQTest2("LMPS-4,5,11,: Invite Admin, Admin registration, Login ",testCaseId,exe_start_date ,exe_end_date, (status == "PASS"), function(err){
            log.info("the stauts in the qtest function is...: " + status);
                if(err){
                    log.info("the error is...."+err);
                    done(err);
                }else{
                    log.info(" you are able to updated in qtest.");
                    console.log("<-------------------------TESTCASE execution done------------------------->");
                    done();
                }
            })
    })

})

