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
var math = require('mathjs');
var curtsy = require('curtsy');

var date = new Date();
var log = bootstrap.log;
var resultsXmlFile;
var browser;
var TheAPI = request(settings.qtest.apiurl);
var Testurl = request(settings.local.path);
var authkey = "Basic N2I1YTM4NzA1ZDdiMzU2MjY1NTkyNTQwNmE2NTJlMzI6NjU1ZjUyMzEyODIxMmQ2ZTcwNjM0NDQ2MjI0YzJhNDg=";
var Usernameforlogin = "ankitap@mobiquityinc.com";
var passwordforlogin = "Password1@";

var randomnumber=Math.floor(Math.random()*5555)
var EmpNum ;
var authtoken;
var authtokenandtype; 
var EmailID = "apatel51@gmail.com";
var sql = require('mssql');
var recordsets;
var DBvalue;

describe('Lifemap api', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator

    var exe_start_date = new moment.utc().format();
    console.log("start date " + exe_start_date);

    connect = new connect(browser);

    it('should return login using outh', function(done) {
        console.log("<------------------------------TESTCASE-login------------------------------>");
        testCaseId = 998021;
        Testurl
          .get('/groupadmin-1.0.2/api/user/login?grant_type=password&username='+Usernameforlogin+'&password='+passwordforlogin)
          //.get('/groupadmin-1.0.2/api/user/login?grant_type=password&username=ankitap@mobiquityinc.com&password=Password1@')
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
   
    it('should invite primary/seconday admin', function(done) {
        console.log("<------------------------------TESTCASE-1------------------------------>");
        console.log(randomnumber);
        testCaseId = 998025;
        Testurl
          .post('/groupadmin-1.0.2/api/user/invite')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "email":EmailID,
                "role":"SecondaryAdmin",
                "divisions": [ {"id":"0000"}, {"id":"0001"}],
                "firstName":"sneha",
                "lastName":"shah",
                "mobile":"9979039016",
                "ssn":"5555"
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test1: Response code: '+res.statusCode);
                log.info('Test1: Response: \n'+JSON.stringify(res.body, null, 2));
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
    
    it('should let me connect with database', function(done){
      console.log(EmailID);
      
        var config = {
            user: 'LifeMapUser',
            password: 'LifeMap.Pass!',
            server: 'lifemapdb.cpq0wd7ig8gq.us-east-1.rds.amazonaws.com', // You can use 'localhost\\instance' to connect to named instance
            database: 'lm_mobgate',
        }

         var connection = new sql.Connection(config, function(err) {
            
            var request = new sql.Request(connection); // or: var request = connection.request();
            var query_here = ("SELECT inviteLink FROM dbo.MgUser where Email = "+"'"+EmailID+"'");
            log.info("The query_here is : " + query_here);
            request.query(query_here , function(err, recordset) {
                if(err){
                  log.info(err);
                }else{
                   console.dir(recordset);
                   DBvalue =recordset;
                   done();
                }
            });
         })  
      
     })

    it('should register manually ', function(done) {
        console.log("<------------------------------TESTCASE-2------------------------------>");
        console.log(DBvalue);
        var DBvalue_string = JSON.stringify(DBvalue, null, 2);
        var inviteLink_split = DBvalue_string.split("/");
        var inviteLink_split1 = inviteLink_split[0];
        var inviteLink_split2 = inviteLink_split[1];
        var registerSpilt = inviteLink_split2.split("\"");
        var register = registerSpilt[0];

        // log.info("The String first value is \n: " + DBvalue_string);
        // log.info("The String second value is : " + inviteLink_split1);
        // log.info("The String third value is : " + inviteLink_split2);
        log.info("The resgisterSpilt is : " +register);

        testCaseId = 1034601;
        Testurl
          .post('/groupadmin-1.0.2/api/user/'+register+'')
          .set('Content-Type','application/json')
          .send({
                "firstName": "ankita",
                "lastName": "shah",
                "mobile": "9974730245",
                "userName": "sshah@mobiquityinc.com", 
                "email":EmailID,
                "password":"Password1@",
                "confirmPassword":"Password1@",
                "ssn":"5555"
          })
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
   
    it('should return login using outh', function(done) {
        console.log("<------------------------------TESTCASE-3------------------------------>");
        testCaseId = 998021;
        Testurl
          //.get('/groupadmin-1.0.2/api/user/login?grant_type=password&username='+Usernameforlogin+'&password='+passwordforlogin)
          .get('/groupadmin-1.0.2/api/user/login?grant_type=password&username='+EmailID+'&password=Password1@')
          .set('Content-Type','application/json')
          .set('Authorization',authkey)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test3: Response code: '+res.statusCode);
                log.info('Test3: Response: \n'+JSON.stringify(res.body, null, 2));
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

