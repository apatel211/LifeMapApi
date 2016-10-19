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
var authtoken;
var authtokenandtype; 

var CreateEmpNum = "1072";
var ViewEmpNum = "909"
var UpdateEmpNum = "1088";
var DeleteEmpNum = "109";
var randomnumber=Math.floor(Math.random()*6767611606)
var EmpDepNum ;
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

   
    it('To create employee dependent,validation message with wrong relationship value with status 400', function(done) {
        console.log("<------------------------------TESTCASE-1------------------------------>");
        testCaseId = 1034539;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+CreateEmpNum+'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "ssn":randomnumber,
                "dob":"2014-11-19",
                "firstName":"Ankit",
                "lastName":"Patel",
                "gender":"F",
                "relationship":"k",
                "effectiveDate":"2019-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test1: Response code: '+res.statusCode);
                log.info('Test1: Response: \n'+JSON.stringify(res.body, null, 2));
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
    
    it('To create employee dependent , validation message with wrong gender value with status 400', function(done) {
        console.log("<------------------------------TESTCASE-2------------------------------>");
        testCaseId = 1034539;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+CreateEmpNum+'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "ssn":randomnumber,
                "dob":"2014-11-19",
                "firstName":"Ankit",
                "lastName":"Patel",
                "gender":"l",
                "relationship":"CH",
                "effectiveDate":"2019-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test2: Response code: '+res.statusCode);
                log.info('Test2: Response: \n'+JSON.stringify(res.body, null, 2));
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
    
    it('To create employee dependent, validation message with same SSN value with status 409', function(done) {
        console.log("<------------------------------TESTCASE-3------------------------------>");
        testCaseId = 1034539;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+CreateEmpNum+'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "ssn":"111111111",
                "dob":"2014-11-19",
                "firstName":"Ankit",
                "lastName":"Patel",
                "gender":"F",
                "relationship":"CH",
                "effectiveDate":"2019-08-01"
          })
          .expect(409)
          .end(function(err, res) {
                log.info('Test3: Response code: '+res.statusCode);
                log.info('Test3: Response: \n'+JSON.stringify(res.body, null, 2));
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
    
    it('To create employee dependent, validation message with wrong date with 400', function(done) {
        console.log("<------------------------------TESTCASE-4------------------------------>");
        testCaseId = 1034539;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+CreateEmpNum+'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "ssn":randomnumber,
                "dob":"2014-11-19",
                "firstName":"Ankit",
                "lastName":"Patel",
                "gender":"F",
                "relationship":"CH",
                "effectiveDate":"209-08-01"
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

    it('To create employee dependent, validation message with future birth date with status 409', function(done) {
        console.log("<------------------------------TESTCASE-5------------------------------>");
        testCaseId = 1034539;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+CreateEmpNum+'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "ssn":randomnumber,
                "dob":"2020-11-30",
                "firstName":"Ankit",
                "lastName":"Patel",
                "gender":"F",
                "relationship":"CH",
                "effectiveDate":"2019-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test5: Response code: '+res.statusCode);
                log.info('Test5: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('To create employee dependent, validation message with 9 Digit SSN value with status 400', function(done) {
        console.log("<------------------------------TESTCASE-6------------------------------>");
        testCaseId = 1034539;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+CreateEmpNum+'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "ssn":"12439",
                "dob":"2014-11-19",
                "firstName":"Ankit",
                "lastName":"Patel",
                "gender":"F",
                "relationship":"CH",
                "effectiveDate":"2019-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test6: Response code: '+res.statusCode);
                log.info('Test6: Response: \n'+JSON.stringify(res.body, null, 2));
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
    
    it('View Employee dependent profile, validation message with wrong employee id no user found status 200', function(done) {
        console.log("<------------------------------TESTCASE-7------------------------------>");
        testCaseId = 1017358;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+ ViewEmpNum +'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send()
          .expect(409)
          .end(function(err, res) {
                log.info('Test7: Response code: '+res.statusCode);
                log.info('Test7: Response: \n'+JSON.stringify(res.body, null, 2));
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
    
    it('update emplyee dependent, validtaion message with wrong dependent id, id not matched status 400', function(done) {
        console.log("<------------------------------TESTCASE-8------------------------------>");
        testCaseId = 1017358;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/dependents/1088')
          .set('Content-Type','application/json')
          .set('Authorization',authkey)
          .set('Authorization',authtokenandtype)
          .send({
                "id":"108",  
                "ssn":"199019910",
                "dob":"1614-11-21",
                "firstName":"Matthew",
                "lastName":"Carter",
                "gender":"F",
                "relationship":"S",
                "effectiveDate":"2110-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test8: Response code: '+res.statusCode);
                log.info('Test8: Response: \n'+JSON.stringify(res.body, null, 2));
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
  
    it('To update employee dependent,validation message with wrong relationship value with status 400', function(done) {
        console.log("<------------------------------TESTCASE-9------------------------------>");
        testCaseId = 1017358;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/dependents/'+UpdateEmpNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "id":UpdateEmpNum,  
                "ssn":randomnumber,
                "dob":"1614-11-21",
                "firstName":"Matthew",
                "lastName":"Carter",
                "gender":"F",
                "relationship":"k",
                "effectiveDate":"2110-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test9: Response code: '+res.statusCode);
                log.info('Test9: Response: \n'+JSON.stringify(res.body, null, 2));
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
    
    it('To update employee dependent , validation message with wrong gender value with status 400', function(done) {
        console.log("<------------------------------TESTCASE-10------------------------------>");
        testCaseId = 1017358;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/dependents/'+UpdateEmpNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
               "id":UpdateEmpNum,  
                "ssn":randomnumber,
                "dob":"1614-11-21",
                "firstName":"Matthew",
                "lastName":"Carter",
                "gender":"l",
                "relationship":"CH",
                "effectiveDate":"2110-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test10: Response code: '+res.statusCode);
                log.info('Test10: Response: \n'+JSON.stringify(res.body, null, 2));
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
    
    it('To upadte employee dependent, validation message with valid SSN value with status 400', function(done) {
        console.log("<------------------------------TESTCASE-11------------------------------>");
        testCaseId = 1017358;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/dependents/'+UpdateEmpNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "id":UpdateEmpNum,  
                "ssn":"1990",
                "dob":"1614-11-21",
                "firstName":"Matthew",
                "lastName":"Carter",
                "gender":"F",
                "relationship":"CH",
                "effectiveDate":"2110-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test11: Response code: '+res.statusCode);
                log.info('Test11: Response: \n'+JSON.stringify(res.body, null, 2));
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
    
    it('To upadte employee dependent, validation message with wrong date with 400', function(done) {
        console.log("<------------------------------TESTCASE-12------------------------------>");
        testCaseId = 1017358;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/dependents/'+UpdateEmpNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "id":UpdateEmpNum,  
                "ssn":randomnumber,
                "dob":"1614-11-21",
                "firstName":"Matthew",
                "lastName":"Carter",
                "gender":"F",
                "relationship":"CH",
                "effectiveDate":"210-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test12: Response code: '+res.statusCode);
                log.info('Test12: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('To upadte employee dependent, validation message with future birth date with status 409', function(done) {
        console.log("<------------------------------TESTCASE-13------------------------------>");
        testCaseId = 1017358;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/dependents/'+UpdateEmpNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "id":UpdateEmpNum,  
                "ssn":101010101,
                "dob":"2015-11-21",
                "firstName":"Matthew",
                "lastName":"Carter",
                "gender":"F",
                "relationship":"CH",
                "effectiveDate":"2110-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test13: Response code: '+res.statusCode);
                log.info('Test13: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('To update employee dependent,validation message with wrong relationship value(spouse is already exist) with status 409', function(done) {
        console.log("<------------------------------TESTCASE-14------------------------------>");
        testCaseId = 1017358;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/dependents/'+UpdateEmpNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "id":UpdateEmpNum,  
                "ssn":randomnumber,
                "dob":"1614-11-21",
                "firstName":"Matthew",
                "lastName":"Carter",
                "gender":"F",
                "relationship":"S",
                "effectiveDate":"2110-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test14: Response code: '+res.statusCode);
                log.info('Test14: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('delete employee dependent, validation message with no dependent or already deleted dependent with status 409', function(done) {
        console.log("<------------------------------TESTCASE-15------------------------------>");
        testCaseId = 1017358;
        Testurl
          .delete('/groupadmin-1.0.2/api/employee/dependents/'+DeleteEmpNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
            "terminationDate": "2014-12-08"
          })
          .expect(409)
          .end(function(err, res) {
                log.info('Test15: Response code: '+res.statusCode);
                log.info('Test15: Response: \n'+JSON.stringify(res.body, null, 2));
                if(res.statusCode==409) {
                    status ="PASS";
                    log.info("The test passed..!!!");
                 }else{
                    status ="FAIL";
                    log.info("As one of the test-case failed");
                }
            log.info("status of the charter is...: " + status);
            assert.equal(res.statusCode,409);
            assert.notEqual(0, res.length);
            done();
        });
    })

    // afterEach(function(done){
    //     log.warn("the value of status is....: "+ status);
    //     log.info("you are able to login in qtest, pass!!!");
    //     var exe_end_date = new moment.utc().format();
    //     console.log("end date " + exe_end_date);
    //     connect.UploadResultToQTest2("LMPS-44,75: create employee Dependent,get details,update and delete",testCaseId,exe_start_date ,exe_end_date, (status == "PASS"), function(err){
    //             log.info("the stauts in the qtest function is...: " + status);
    //             if(err){
    //                 log.info("the error is...."+err);
    //                 done(err);
    //             }else{
    //                 log.info(" you are able to updated in qtest.");
    //                 console.log("<-------------------------TESTCASE execution done------------------------->");
    //                 done();
    //             }
    //         })
    // })

})

