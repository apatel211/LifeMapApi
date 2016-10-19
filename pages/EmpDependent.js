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
var Usernameforlogin = "ankitap@mobiquityinc.com";
var passwordforlogin = "Password1@";
var authtoken;
var authtokenandtype; 

//var randomnumber=Math.floor(Math.random()*1111111815)
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

var regex = /(?!000)(?!666)[0-8]{1}[0-9]{2}(?!00)[0-9]{2}(?!0000)[0-9]{4}/; 
while(1){
randomNumber = Math.floor((Math.random()*885000000));
  var ssn3 = randomNumber.toString()
if(ssn3.match(regex)){
 break;
}
}
var randomnumberempdepSpouse =ssn3;

var EmpNum;
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

    it('To create employee dependent', function(done) {
        console.log("<------------------------------TESTCASE-2------------------------------>");
        testCaseId = 1034539;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/'+EmpNum+'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({ 
                "ssn":"23436546467",
                "dob":"2014-19-19",
                "firstName":"",
                "lastName":"",
                "gender":"",
                "relationship":"CHH",
                "effectiveDate":"2015-08-01"
          })
          .expect(400)
          .end(function(err, res) {
                log.info('Test1: Response code: '+res.statusCode);
                log.info('Test1: Response: \n'+JSON.stringify(res.body, null, 2));

                // EmpDepNum = res.body.data.id;
                // console.log("Employee Id is "+ EmpDepNum);

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

    it('View Employee dependent profile ', function(done) {
        console.log("<------------------------------TESTCASE-3------------------------------>");
        testCaseId = 1017358;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/1234/dependents')
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
   
    it('update emplyee dependent', function(done) {
        console.log("<------------------------------TESTCASE-3------------------------------>");
        testCaseId = 1017358;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/3136/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "id":2456,  
                "ssn":"657568778",
                "dob":"1914-11-21",
                "firstName":"Matthew",
                "lastName":"Carter",
                "gender":"F",
                "relationship":"CH",
                "effectiveDate":"2015-08-01"
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

    it('delete employee dependent', function(done) {
        console.log("<------------------------------TESTCASE-4------------------------------>");
        testCaseId = 1017358;
        Testurl
          .delete('/groupadmin-1.0.2/api/employee/1234/dependents/1234')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
            "terminationDate": "2014-12-08"
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
    
    it('To create employee dependent', function(done) {
        console.log("<------------------------------TESTCASE-5------------------------------>");
        testCaseId = 1034539;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/'+EmpNum+'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({        
                "ssn": randomnumberempdepSpouse,
                "dob":"1864-12-21",
                "firstName":"Matthew",
                "lastName":"Car",
                "gender":"F",
                "relationship":"CH",
                "effectiveDate":"2016-07-01"
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test1: Response code: '+res.statusCode);
                log.info('Test1: Response: \n'+JSON.stringify(res.body, null, 2));

                EmpDepNum = res.body.data.id;
                console.log("Employee Id is "+ EmpDepNum);

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
   
   it('update emplyee dependent', function(done) {
        console.log("<------------------------------TESTCASE-6------------------------------>");
        testCaseId = 1017358;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/'+EmpNum+'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "id":EmpDepNum,  
                "ssn":randomnumberempdepSpouse,
                "dob":"1914-21-21",
                "firstName":"Matthew",
                "lastName":"Carter",
                "gender":"",
                "relationship":"",
                "effectiveDate":"2015-08-01"
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
    
    it('delete employee dependent', function(done) {
        console.log("<------------------------------TESTCASE-7------------------------------>");
        testCaseId = 1017358;
        Testurl
          .delete('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/dependents/'+EmpDepNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
            "terminationDate": "2016-20-20"
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

})

