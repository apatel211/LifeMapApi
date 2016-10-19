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
var randomnumberemp ="600000091";
//var randomnumberempdep=Math.floor(Math.random()*233434433)
var randomnumberempdep = "400000094";
var EmpNum ;
var authtoken;
var authtokenandtype;
var authtokenLDAP;
var authtokenandtypeLDAP; 
var EmailID = "ankitas17@gmail.com";
var sql = require('mssql');
var recordsets;
var DBvalue;
var projectId="8275";
var divisionid;
var benid;
var CovNum;
var UpdateCovNum;
var EmpNumRehire;
var UpdateDepNum;
var beniddep;
var UpdateDepCovNum;
var DepCovNum;

describe('Lifemap api', function() {
    this.timeout(bootstrap.MaxWaittime); // To get the app open in the emulator
    console.log(randomnumberemp);
    console.log(randomnumberempdep);
    var exe_start_date = new moment.utc().format();
    console.log("start date " + exe_start_date);
    connect = new connect(browser);

    it('should return login using LDAP ', function(done) {
        console.log("<------------------------------TESTCASE-login------------------------------>");
        testCaseId = 998021;
        Testurl
          //.get('/groupadmin-1.0.2/api/user/login?grant_type=password&username='+Usernameforlogin+'&password='+passwordforlogin)
          .get('/groupadmin-1.0.2/api/user/login?grant_type=password&username=admin@lifemapco.com&password=Password1')
          .set('Content-Type','application/json')
          .set('Authorization',authkey)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test: Response code: '+res.statusCode);
                log.info('Test: Response: \n'+ JSON.stringify(res.body, null, 2));

                authtokenLDAP = res.body.access_token;
                console.log("Token is "+ authtokenLDAP);
                authtokenandtypeLDAP =("Bearer "+ authtokenLDAP);
                console.log(authtokenandtypeLDAP);

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

    it('about user information LDAP ', function(done) {
        console.log("<------------------------------TESTCASE-UserInformation ------------------------------>");
        testCaseId = 1044333;
        Testurl
          .get('/groupadmin-1.0.2/api/user/admin@lifemapco.com')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtypeLDAP)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test: Response code: '+res.statusCode);
                log.info('Test: Response: \n'+ JSON.stringify(res.body, null, 2));

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

    it('about employee roster information LDAP ', function(done) {
        console.log("<------------------------------TESTCASE-Roster------------------------------>");
        testCaseId = 1034599;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/roster')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtypeLDAP)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test: Response code: '+res.statusCode);
                log.info('Test: Response: \n'+ JSON.stringify(res.body, null, 2));

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
        console.log(randomnumberemp);
        testCaseId = 998025;
        Testurl
          .post('/groupadmin-1.0.2/api/user/invite')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtypeLDAP)
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

                authtoken = res.body.access_token;
                console.log("Token is "+ authtokenLDAP);
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
        console.log("<------------------------------TESTCASE-4------------------------------>");
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

    it('To create employee dependent', function(done) {
        console.log("<------------------------------TESTCASE-5------------------------------>");
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

    it('To Get division ID ', function(done) {
        console.log("<------------------------------TESTCASE-6------------------------------>");
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

                beniddep = res.body.data.coverages[0].benefits[1].id;
                console.log("benifit Id is "+ beniddep);

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

    it('Create employee coverage', function(done) {
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

    it('Create employee dependent coverage', function(done) {
        console.log("<------------------------------TESTCASE-8------------------------------>");
        testCaseId = 1044343;
       Testurl
          .post('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/dependent/'+ EmpDepNum +'/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitId": beniddep,
                "volume":"",
                "effectiveDate":"2015-08-30"
          })
          .expect(200)
         .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));

                DepCovNum = res.body.data.id;
                console.log("coverage Id is "+ DepCovNum);

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

    it('View Employee profile ', function(done) {
        console.log("<------------------------------TESTCASE-9------------------------------>");
        testCaseId = 1034603;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+ EmpNum)
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
    
    it('update emplyee profile', function(done) {
        console.log("<------------------------------TESTCASE-10------------------------------>");
        testCaseId = 1034601;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/'+ EmpNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "id":EmpNum,  
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

    it('update emplyee dependent', function(done) {
        console.log("<------------------------------TESTCASE-11------------------------------>");
        testCaseId = 1017358;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/dependents/'+EmpDepNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "id":EmpDepNum,  
                "ssn":randomnumberempdep,
                "dob":"1914-11-21",
                "firstName":"Matthew",
                "lastName":"Carter",
                "gender":"F",
                "relationship":"CH",
                "effectiveDate":"2015-08-01"
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test3: Response code: '+res.statusCode);
                log.info('Test3: Response: \n'+JSON.stringify(res.body, null, 2));

                UpdateDepNum = res.body.data.id;
                console.log("coverage Id is "+ UpdateDepNum);

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

    it('Update employee coverage', function(done) {
        console.log("<------------------------------TESTCASE-12------------------------------>");
        testCaseId = 1078330;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/coverages/'+CovNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitID":benid,
                "volume":"",
                "effectiveDate":"2015-04-30"
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));

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

    it('Update employee dependent coverage', function(done) {
        console.log("<------------------------------TESTCASE-13------------------------------>");
        testCaseId = 1044343;
        Testurl
          .put('/groupadmin-1.0.2/api/employee/dependent/coverages/'+DepCovNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
                "benefitId":beniddep,
                "volume":"",
                "effectiveDate":"2015-09-30"
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));

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

    it('View Employee profile ', function(done) {
        console.log("<------------------------------TESTCASE-14------------------------------>");
        testCaseId = 1034603;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+ EmpNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test2: Response code: '+res.statusCode);
                log.info('Test2: Response: \n'+JSON.stringify(res.body, null, 2));

                UpdateCovNum = res.body.data.electedCoverages[0].benefitID;
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

    it('View Employee dependent profile ', function(done) {
        console.log("<------------------------------TESTCASE-15------------------------------>");
        testCaseId = 1044343;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+ EmpNum+'/dependents')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test2: Response code: '+res.statusCode);
                log.info('Test2: Response: \n'+JSON.stringify(res.body, null, 2));

                UpdateDepCovNum = res.body.data.dependents[0].electedCoverages[0].id;;
                console.log("coverage Id is "+ UpdateDepCovNum);

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

    it('view employee coverage', function(done) {
        console.log("<------------------------------TESTCASE-16------------------------------>");
        testCaseId = 1078331;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('view employee dependent coverage', function(done) {
        console.log("<------------------------------TESTCASE-17------------------------------>");
        testCaseId = 1044343;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+ EmpNum +'/dependent/'+ EmpDepNum +'/coverages')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send()
          .expect(200)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('delete employee dependent coverage', function(done) {
        console.log("<------------------------------TESTCASE-18------------------------------>");
        console.log("updtae cov no" +UpdateDepCovNum)
        testCaseId = 1044343;
        Testurl
          .delete('/groupadmin-1.0.2/api/employee/dependent/coverages/'+ UpdateDepCovNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
              "terminationDate":"2014-12-16"
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('delete employee coverage', function(done) {
        console.log("<------------------------------TESTCASE-19------------------------------>");
        testCaseId = 1078330;
        Testurl
          .delete('/groupadmin-1.0.2/api/employee/coverages/'+ UpdateCovNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
              "terminationDate":"2014-01-01"
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('delete employee dependent', function(done) {
        console.log("<------------------------------TESTCASE-20------------------------------>");
        testCaseId = 1017358;
        Testurl
          .delete('/groupadmin-1.0.2/api/employee/dependents/'+EmpDepNum)
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
            "terminationDate": "2014-12-08"
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));
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

    it('View Employee profile, without dependent and coverages ', function(done) {
        console.log("<------------------------------TESTCASE-21------------------------------>");
        testCaseId = 1034603;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+ EmpNum)
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

    it('delete employee', function(done) {
        console.log("<------------------------------TESTCASE-22------------------------------>");
        testCaseId = 998021;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+EmpNum)
          .set('Content-Type','application/json')
          .set('Authorization',authkey)
          .set('Authorization',authtokenandtype)
          .send({
            "terminationDate":"2015-01-01",
            "terminationReason":"TE"
          })
          .expect(200)
          .end(function(err, res) {
                log.info('Test4: Response code: '+res.statusCode);
                log.info('Test4: Response: \n'+JSON.stringify(res.body, null, 2));
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

    
    
    it('View Employee profile ,INACTIVE employee', function(done) {
        console.log("<------------------------------TESTCASE-23------------------------------>");
        testCaseId = 1034603;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+ EmpNum)
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

    it('View Employee profile, Rehire employee', function(done) {
        console.log("<------------------------------TESTCASE-24------------------------------>");
        testCaseId = 1034603;
        Testurl
          .post('/groupadmin-1.0.2/api/employee/'+EmpNum+'/rehire')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({
              "forceReinstate":0,
              "rehire":"2015-01-08"
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

    it('View Employee profile ,ACTIVE employee', function(done) {
        console.log("<------------------------------TESTCASE-25------------------------------>");
        testCaseId = 1034603;
        Testurl
          .get('/groupadmin-1.0.2/api/employee/'+ EmpNum)
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

    it('User signout', function(done) {
        console.log("<------------------------------TESTCASE-26------------------------------>");
        testCaseId = 1034603;
        Testurl
          .post('/groupadmin-1.0.2/api/user/'+ EmailID +'/signout')
          .set('Content-Type','application/json')
          .set('Authorization',authtokenandtype)
          .send({})
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
        connect.UploadResultToQTest2("LMPS-4,5,11,29,33,39,41,44,75,35,37,38,105,99 ",testCaseId,exe_start_date ,exe_end_date, (status == "PASS"), function(err){
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

