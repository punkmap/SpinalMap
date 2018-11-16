const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');
const cors = require('cors');

//https://github.com/request/request
const request = require("request");

const couchAdmin = require('couch-admin')({
    url: 'http://localhost:5984',
    user: 'admin',
    pass: 'testme',
    user_db: '_users'// Optional 
});

const app = express();
app.use(cors());
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.render('index', {
                //customers:data.data.rows
            })
})
var authToken;
app.post('/login', function(req, res){
    console.log('req:' +JSON.stringify(req.body));
    // var user = req.body.user;
    // var pass = req.body.pass;
    //for vue application:
    var user = req.body.name;
    var pass = req.body.password;
    var reqBody = "name="+user+"&password="+pass;
    console.log("user: " + user);
    console.log("pass: " + pass);
    var reqBodyLength = reqBody.length;
    console.log("reqBody: " + reqBody);
    console.log("reqBodyLength: " + reqBodyLength);
//    {"name": "root","password": "relax"}
    //name=root&password=relax
    request.post({
      headers: {'content-type' : 'application/x-www-form-urlencoded', 'content-length':reqBodyLength},
      url:     'http://127.0.0.1:5984/_session',
      body:    reqBody
    }, function(error, response, body){
        
            console.log("body: " + body);
            console.log("response.headers: " + JSON.stringify(response.headers));
            authToken = response.headers["set-cookie"];
            console.log("set cookie");
            console.log("authToken: " + authToken);
            var bodyJSON = JSON.parse(body)
            console.log("bodyJSON: " + JSON.stringify(bodyJSON));
            console.log("bodyJSON.error: " + bodyJSON.error);
            if(!bodyJSON.hasOwnProperty("error")){
                console.log("bodyJSON not has error");
                res.send(authToken);
                console.log("ressent");
            }
            else{
                console.log('body.error: ' + JSON.stringify(body.error)); 
                res.send("loginError")
            }
           
        //    const dbName = 'customers'
        //    const viewUrl = '_design/all_customers/_view/all';
        //    couch.listDatabases().then(function(dbs){
        //        console.log("dbs: " + dbs);
        //    })
           
        //    couch.get(dbName, viewUrl).then(
        //        function(data, headers, status){
        //        console.log('data: ' +JSON.stringify(data.data.rows));
        //        res.send('test');
        //    }, 
        //    function(error){
        //       console.log("there was an error: " + JSON.stringify(error));
        //       res.send(error);
        //    })
        
    });
    //res.redirect('/');
})
// app.post('/logout', function(req, res){
//     console.log('node logout');
//     res.send('node logout');
//     request({ method: 'DELETE', 
//         headers: {'Accept': 'application/json', 
//             'Cookie': authToken},
//         url: 'http://127.0.0.1:5984/_session'}, function(error, response, body){
//         console.log("createdb body: " + body);
//         console.log("createdb response: " + JSON.stringify(response));
//     })
// })    
app.post('/getgeothemes', function(req,res){
    request({ method: 'get', 
        headers: {'Accept': 'application/json', 
            'Cookie': authToken},
        url: 'http://127.0.0.1:5984/punkmap/_design/geothemes/_view/getGeothemes',
        }, function(error, response, body){
        console.log("getgeothemes body: " + body);
        var jsonBody = JSON.parse(body);
        console.log('jsonBody: '+JSON.stringify(jsonBody));
        console.log('jsonBody.rows: '+JSON.stringify(jsonBody.rows));
        var resGeothemes = [];
        jsonBody.rows.forEach(function(geotheme){
            
            console.log("key.Nmew" + JSON.stringify(geotheme.key.name));
            console.log(geotheme.key.name);
            console.log(geotheme.key.label);
            console.log(geotheme.key.desc);
            console.log(geotheme.key.fields);
            resGeothemes.push({"name": geotheme.key.name, 
                               "label": geotheme.key.label, 
                               "desc":geotheme.key.desc, 
                               "fields":geotheme.key.fields});
        })
        console.log('resGeothemes: ' + JSON.stringify(resGeothemes));
        res.send(resGeothemes);
    })
})    
// app.post('/getgeotheme', function(req,res){
//     request({ method: 'get', 
//         headers: {'Accept': 'application/json', 
//             'Cookie': authToken},
//         url: 'http://127.0.0.1:5984/customers/_design/geothemes/_view/getGeotheme',
//         }, function(error, response, body){
//         console.log("getgeothemes body: " + body);
//         var jsonBody = JSON.parse(body);
//         console.log('jsonBody: '+JSON.stringify(jsonBody.rows[0].value.geothemes));
//         console.log("getgeothemes response: " + JSON.stringify(response));
//         console.log("getgeothemes error: " + JSON.stringify(error));
//         var resGeothemes = jsonBody.rows[0].value;
//         console.log('resGeothemes: ' + JSON.stringify(resGeothemes));
//         res.send(resGeothemes);
//     })
// })
app.post('/createdocument', function(req,res){
    request({ method: 'post', 
        headers: {'Accept': 'application/json', 
            'Cookie': authToken},
        url: 'http://127.0.0.1:5984/customers',
        json: {foo: "bar", woo: "car"}}, function(error, response, body){
        console.log("createdb body: " + body);
        console.log("createdb response: " + JSON.stringify(response));
        res.send('documentCreated');
        console.log("createdocument error: " + JSON.stringify(error));
    })
});
app.post('/createdb', function(req,res){
    request({ url: 'http://127.0.0.1:5984/testDB', method: 'POST', json: {foo: "bar", woo: "car"}}, function(error, response, body){
        console.log("createdb body: " + body);
        console.log("createdb response: " + JSON.stringify(response));
    })
});
app.post('/passwordreset', function(req, res){
    var user = req.body.user;
    var pass = req.body.pass;
    console.log("user: " + user);
    console.log("pass: " + pass);
    couchAdmin.changePassword(user, pass, function(){
    })
    //res.redirect('/');
});
app.listen(3000, function(){
    console.log('Server started on port 3000');
})

