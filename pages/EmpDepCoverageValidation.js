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

//var randomnumberemp=Math.floor(Math.random()*323332422)
var randomnumberemp ="300434344";
//var randomnumberempdep=Math.floor(Math.random()*233434433)
var randomnumberempdep = "500655656";
var EmpNum ;
var EmpDepNum;
var authtoken;
var authtokenandtype; 
var projectId="8275";
var divisionid;
var benid;
var CovNum;
var UpdateCovNum;

describe('Lifemap api', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator
    console.log(randomnumberemp);
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
                "ssn":randomnumberemp,
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
    
    it('To create employee dependent', function(done) {
        console.log("<------------------------------TESTCASE-3------------------------------>");
        testCaseId = 1034539;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+EmpNum+'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "ssn":randomnumberempdep,
                "dob":"2014-11-19",
                "firstName":"Ankit",
                "lastName":"Patel",
                "gender":"F",
                "relationship":"CH",
                "effectiveDate":"2015-08-01"
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test1: Response code: '+res.statusCode);
                log.info('Test1: Response: \n'+JSON.stringify(res.body, null, 2));

                EmpDepNum = res.body.data.id;
                console.log("Employee dependent Id is "+ EmpDepNum);

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

    it('Create employee dependent coverage, benefitid is not allowed ', function(done) {
        console.log("<------------------------------TESTCASE-4------------------------------>");
        testCaseId = 1044343;
       Testurl
          .post('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/dependent/'+ EmpDepNum +'/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitId": "67",
                "volume":"",
                "effectiveDate":"2015-08-30"
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

    it('Create employee dependent coverage,volume should be in range ', function(done) {
        console.log("<------------------------------TESTCASE-5------------------------------>");
        testCaseId = 1044343;
       Testurl
          .post('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/dependent/'+ EmpDepNum +'/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitId":benid,
                "volume":"0",
                "effectiveDate":"2015-08-30"
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

     it('Create employee dependent coverage, effective date should be in range ', function(done) {
        console.log("<------------------------------TESTCASE-6------------------------------>");
        testCaseId = 1044343;
       Testurl
          .post('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/dependent/'+ EmpDepNum +'/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitId":benid,
                "volume":"",
                "effectiveDate":"2014-08-30"
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

    it('view employee dependent coverage, user not found or logged in', function(done) {
        console.log("<------------------------------TESTCASE-7------------------------------>");
        testCaseId = 1044343;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/1876/dependent/1899/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send()
          .expect(404)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('Create employee dependent coverage', function(done) {
        console.log("<------------------------------TESTCASE-8------------------------------>");
        testCaseId = 1044343;
       Testurl
          .post('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/dependent/'+ EmpDepNum +'/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitId":benid,
                "volume":"",
                "effectiveDate":"2015-08-30"
          })
          .expect(200)
         .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('Update employee dependent coverage,benifit is is not allowed', function(done) {
        console.log("<------------------------------TESTCASE-9------------------------------>");
        testCaseId = 1044343;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/dependent/coverages/'+CovNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitId":"18",
                "volume":"",
                "effectiveDate":"2015-09-30"
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

    it('Update employee dependent coverage,effective date should be hire', function(done) {
        console.log("<------------------------------TESTCASE-10------------------------------>");
        testCaseId = 1044343;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/dependent/coverages/'+CovNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitId":benid,
                "volume":"",
                "effectiveDate":"2014-09-30"
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
     
    it('View Employee dependent  profile ', function(done) {
        console.log("<------------------------------TESTCASE-11------------------------------>");
        testCaseId = 1044343;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test2: Response code: '+res.statusCode);
                log.info('Test2: Response: \n'+JSON.stringify(res.body, null, 2));

                UpdateCovNum = res.body.data.dependents[0].electedCoverages[0].id;
                console.log("coverage Id is "+ UpdateCovNum);

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

   it('delete employee dependent coverage,could not find elected coverages', function(done) {
        console.log("<------------------------------TESTCASE-12------------------------------>");
        console.log("updtae cov no" +UpdateCovNum)
        testCaseId = 1044343;
        Testurl
          .delete('/groupadmin-1.0.2/api/employee/dependent/coverages/8900')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
              "terminationDate":"2014-12-16"
          })
          .expect(404)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('View Employee dependent profile ', function(done) {
        console.log("<------------------------------TESTCASE-13------------------------------>");
        testCaseId = 1044343;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test2: Response code: '+res.statusCode);
                log.info('Test2: Response: \n'+JSON.stringify(res.body, null, 2));

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
    
    afterEach(function(done){
        log.warn("the value of status is....: "+ status);
        log.info("you are able to login in qtest, pass!!!");
        var exe_end_date = new moment.utc().format();
        console.log("end date " + exe_end_date);
        connect.UploadResultToQTest2("LMPS-105: create employee,get details,update coverage ",testCaseId,exe_start_date ,exe_end_date, (status == "PASS"), function(err){
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

