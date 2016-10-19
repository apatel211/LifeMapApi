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
//var Usernameforlogin = "apatelpri@mobiquityinc.com";
//var passwordforlogin = "Password1@";

var randomNumber;
var regex = /(?!000)(?!666)[0-8]{1}[0-9]{2}(?!00)[0-9]{2}(?!0000)[0-9]{4}/; 
while(1){
randomNumber = Math.floor((Math.random()*868000000));
  var ssn = randomNumber.toString()
if(ssn.match(regex)){
 break;
}
}
var randomnumberemp =ssn;

var EmpNum ;
var authtoken;
var authtokenandtype; 
var projectId="8275";
var testCaseId;

describe('Lifemap api', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator
    console.log(randomnumber);
    var exe_start_date = new moment.utc().format();
    console.log("start date " + exe_start_date);
    connect = new connect(browser);

    it('should return login using outh', function(done) {
        console.log("<------------------------------TESTCASE-login------------------------------>");
       // testCaseId = 1034598;
        Testurl
          //.get('/groupadmin-1.0.2/api/user/login?grant_type=password&username='+Usernameforlogin+'&password='+passwordforlogin)
          .get('/groupadmin-1.0.2/api/user/login?grant_type=password&username=apatelpri@mobiquityinc.com&password=Password1@')
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
          .put('/groupadmin-1.0.2/api/employee')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({      
                "maritalStatus": "K",
                "hireDate": "2016-10-01",
                "salary":"20000",
                "salaryFreq": "A",
                "firstName": "",
                "middleName1": "h",
                "lastName": "",
                "dob": "1965-04-01",
                "ssn":"1234567",
                "address": [
                            {
                            "type": "EEMN",
                            "addressLine1": "37 TimberlaneDr.",
                            "addressLine2": "Unit5",
                            "addressCity": "Austin",
                            "addressState": "TX",
                            "addressZipCode": "78740",
                            "addressCountry": "US",
                            "email": "jp@company.com",
                            "phone": "5555556789",
                            "phoneExtension": "",
                            "fax": "55555567890",
                            "faxExtension": ""
                            }]
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

    it('View Employee profile ', function(done) {
        console.log("<------------------------------TESTCASE-2------------------------------>");
        testCaseId = 1034603;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/123')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send()
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
   
    it('update emplyee', function(done) {
        console.log("<------------------------------TESTCASE-3------------------------------>");
        testCaseId = 1034601;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "id":1234,  
                "occupation": "Executive",
                "maritalStatus": "MA",
                "hireDate": "2007-05-17",
                "salary": "2291.67",
                "salaryFreq": "A",
                "firstName": "meshka",
                "middleName1": null,
                "lastName": "Patrizio",
                "nameSuffix": "Jr.",
                "divisionID": "0000",
                "dob": "1877-04-18"
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

    it('delete employee', function(done) {
        console.log("<------------------------------TESTCASE-4------------------------------>");
        testCaseId = 998021;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/345')
          .set('Content-Type','application/json')
          .set('Authorization',authkey)
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

    it('To create employee', function(done) {
        console.log("<------------------------------TESTCASE-5------------------------------>");
        console.log(authtokenandtype);
        testCaseId = 1034598;
        Testurl
          .put('/groupadmin-1.0.2/api/employee')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "maritalStatus": "O",
                "hireDate": "2016-05-01",
                "salary":"20000",
                "salaryFreq": "A",
                "firstName": "ankita",
                "middleName1": "h",
                "lastName": "Patel",
                "dob": "1965-04-01",
                "gender": "M",
                "classId": 320,
                "weeklyHours":40,
                "ssn":randomnumberemp
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test1: Response code: '+res.statusCode);
                log.info('Test1: Response: \n'+JSON.stringify(res.body, null, 2));

                EmpNum = res.body.data.id;
                console.log("Employee Id is "+ EmpNum);

                EmpMemberEntityId = res.body.data.memberEntityId;
                console.log("Employee member entity Id is "+  EmpMemberEntityId);
                
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
   
   it('update emplyee', function(done) {
        console.log("<------------------------------TESTCASE-6------------------------------>");
        testCaseId = 1034601;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "id":EmpNum,  
                "maritalStatus": "MA",
                "hireDate": "2016-10-17",
                "salary": "2291.67",
                "salaryFreq": "A",
                "firstName": "meshka",
                "middleName1": null,
                "lastName": "Patrizio",
                "dob": "1877-18-18"
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

    it('delete employee', function(done) {
        console.log("<------------------------------TESTCASE-7------------------------------>");
        testCaseId = 998021;
        Testurl
          .delete('/groupadmin-1.0.2/api/employee/'+ EmpNum)
          .set('Content-Type','application/json')
          .set('Authorization',authkey)
          .set('Authorization',authtokenandtype)
          .send({
                  "terminationDate": "2016-11-01"
                  // "terminationReason": "EETE"
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
   
})

