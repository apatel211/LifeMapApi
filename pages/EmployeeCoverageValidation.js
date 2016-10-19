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
var randomnumber = require('random');
var httpsserver= require('https-agent');
var date = new Date();
var log = bootstrap.log;
var resultsXmlFile;
var browser;
var TheAPI = request(settings.qtest.apiurl);
var Testurl = request(settings.local.path);
var authkey = "Basic N2I1YTM4NzA1ZDdiMzU2MjY1NTkyNTQwNmE2NTJlMzI6NjU1ZjUyMzEyODIxMmQ2ZTcwNjM0NDQ2MjI0YzJhNDg=";
var Usernameforlogin = "ankitap@mobiquityinc.com";
var passwordforlogin = "Password1@";

var randomnumber=Math.floor(Math.random()*344222333)
var EmpNum ;
var authtoken;
var authtokenandtype; 
var projectId="8275";
var divisionid;
var benid;
var CovNum;
var UpdateCovNum;

describe('Lifemap api', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator
    console.log(randomnumber);
    var exe_start_date = new moment.utc().format();
    console.log("start date " + exe_start_date);
    connect = new connect(browser);

    it('should return login using outh', function(done) {
        console.log("<------------------------------TESTCASE-login------------------------------>");
        testCaseId = 1034598;
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
  
    it('To create employee', function(done) {
        console.log("<------------------------------TESTCASE-1------------------------------>");
        console.log(authtokenandtype);
        testCaseId = 1034598;
        Testurl
          .post('/groupadmin-1.0.2/api/employee')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "status":"FT",
                "occupation":"QA",
                "maritalStatus":"MA",
                "hireDate":"2012-05-20",
                "salary": "229999",
                "salaryFreq":"A",
                "firstName":"sneha",
                "middleName1":"",
                "lastName":"shah",
                "nameSuffix":"Jr.",
                "divisionID":"0000",
                "ssn":randomnumber,
                "dob":"2014-08-12",
                "gender":"M",
                "effectiveDate":"2015-01-19",
                "terminationDate":"2015-11-20",
                "terminationReason":"TE",
                "address": [
                { "type": "MN", "addressLine1": "1777 TimberlaneDr.", "addressLine2": "Unit5", "addressCity": "Austin", "addressState": "TX", "addressZipCode": "78740", "addressCountry": "US", "email": "jp@company.com", "phone": "+55555569.-", "phoneExtension": "", "fax": "+55555567.-", "faxExtension": "" }
                ,
                { "type": "MN", "addressLine1": "1777 TimberlaneDr.", "addressLine2": "Unit5", "addressCity": "Austin", "addressState": "TX", "addressZipCode": "78740", "addressCountry": "US", "email": "jp@company.com", "phone": "+55555569.-", "phoneExtension": "", "fax": "5555556789", "faxExtension": "" }
                ]
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test1: Response code: '+res.statusCode);
                log.info('Test1: Response: \n'+JSON.stringify(res.body, null, 2));

                EmpNum = res.body.data.id;
                console.log("Employee Id is "+ EmpNum);

                divisionid = res.body.data.divisionID;
                console.log("divisionid Id is "+ divisionid);

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
    
    it('To Get division ID ', function(done) {
        console.log("<------------------------------TESTCASE-2------------------------------>");
        testCaseId = 1034598;
        Testurl
          .get('/groupadmin-1.0.2/api/coverages/'+ divisionid)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test2: Response code: '+res.statusCode);
                log.info('Test2: Response: \n'+JSON.stringify(res.body, null, 2));

                benid = res.body.data.coverages[0].benefits[0].id;
                console.log("benifit Id is "+ benid);

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

    it('Create coverage', function(done) {
        console.log("<------------------------------TESTCASE-3------------------------------>");
        testCaseId = 1078332;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitID":12,
                "volume":"",
                "effectiveDate":"2015-03-30"
          })
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

    it('Create coverage,volume should be in range', function(done) {
        console.log("<------------------------------TESTCASE-4------------------------------>");
        testCaseId = 1078332;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitID":benid,
                "volume":"0",
                "effectiveDate":"2015-03-30"
          })
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
    
    it('Create coverage, effective date should be after employees effective date', function(done) {
        console.log("<------------------------------TESTCASE-5------------------------------>");
        testCaseId = 1078332;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitID":benid,
                "volume":"",
                "effectiveDate":"201ss-03-30"
          })
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

    it('view employee coverage, user not found or not logged in', function(done) {
        console.log("<------------------------------TESTCASE-6------------------------------>");
        testCaseId = 1078331;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/1690/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send()
          .expect(409)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));
                if(res.statusCode==409) {
                    status ="PASS";
                    log.info("The test passed..!!!");
                 }else{
                    status ="FAIL";
                    log.info("As one of the test-case failed");
                }
            log.info("status of the charter is...: " + status);
            assert.equal(res.statusCode, 409);
            assert.notEqual(0, res.length);
            done();
        });
    })

    it('Create coverage', function(done) {
        console.log("<------------------------------TESTCASE-7------------------------------>");
        testCaseId = 1078332;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitID":benid,
                "volume":"",
                "effectiveDate":"2015-03-30"
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test3: Response code: '+res.statusCode);
                log.info('Test3: Response: \n'+JSON.stringify(res.body, null, 2));

                CovNum = res.body.data.id;
                console.log("coverage Id is "+ CovNum);

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

    it('Update employee coverage,can not change benefit id', function(done) {
        console.log("<------------------------------TESTCASE-8------------------------------>");
        testCaseId = 1078330;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/coverages/'+CovNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitID":12,
                "volume":"",
                "effectiveDate":"2015-04-30"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));

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
 
    it('Update employee coverage,can not cahnge benefit id', function(done) {
        console.log("<------------------------------TESTCASE-9------------------------------>");
        testCaseId = 1078330;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/coverages/'+CovNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitID":benid,
                "volume":"",
                "effectiveDate":"2012-04-30"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));

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
  
   it('delete employee coverage, not find user or not logged in ', function(done) {
        console.log("<------------------------------TESTCASE-10------------------------------>");
        testCaseId = 1078330;
        Testurl
          .delete('/groupadmin-1.0.2/api/employee/coverages/1888')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
              "terminationDate":"2014-01-01"
          })
          .expect(409)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));
                if(res.statusCode==409) {
                    status ="PASS";
                    log.info("The test passed..!!!");
                 }else{
                    status ="FAIL";
                    log.info("As one of the test-case failed");
                }
            log.info("status of the charter is...: " + status);
            assert.equal(res.statusCode, 409);
            assert.notEqual(0, res.length);
            done();
        });
    })

    afterEach(function(done){
        log.warn("the value of status is....: "+ status);
        log.info("you are able to login in qtest, pass!!!");
        var exe_end_date = new moment.utc().format();
        console.log("end date " + exe_end_date);
        connect.UploadResultToQTest2("LMPS-35,37 and 38,: create employee,get details,update coverage ",testCaseId,exe_start_date ,exe_end_date, (status == "PASS"), function(err){
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

