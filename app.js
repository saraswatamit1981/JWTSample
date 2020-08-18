var config = require("./config.json");
var jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');
var express = require("express");
var app = express();
var port = config.port;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.post('/api/users/sts', function(req, res) {
        var identity = req.body.identity;
        var clientId = ""//config.credentials.appId//req.body.clientId;
        var clientSecret =""// config.credentials.apikey//req.body.clientSecret;

        if(req.body.botName === "NeBo"){
                clientId=config.credentials_hrbot_prod2.appId;
                clientSecret=config.credentials_hrbot_prod2.apikey;
        }
		if(req.body.botName === "NeBo HR"){
                clientId=config.credentials_hrbot_prod.appId;
                clientSecret=config.credentials_hrbot_prod.apikey;
        }
        if(req.body.botName === "NeBo DEV"){
                clientId=config.credentials_hrbot_dev.appId;
                clientSecret=config.credentials_hrbot_dev.apikey;
        }
        if(req.body.botName === "NeBo STAGE"){
                clientId=config.credentials_hrbot_stage.appId;
                clientSecret=config.credentials_hrbot_stage.apikey;
        }
        if(req.body.botName === "NeBo UAT"){
                clientId=config.credentials_hrbot_uat.appId;
                clientSecret=config.credentials_hrbot_uat.apikey;
        }
        if(req.body.botName === "NeBo Legal DEV"){
				clientId=config.credentials_legalbot_dev.appId;
                clientSecret=config.credentials_legalbot_dev.apikey;
        }
        if(req.body.botName === "NeBo Legal STAGE"){
                clientId=config.credentials_legalbot_stage.appId;
                clientSecret=config.credentials_legalbot_stage.apikey;
        }
        if(req.body.botName === "NeBo Legal UAT"){
                clientId=config.credentials_legalbot_uat.appId;
                clientSecret=config.credentials_legalbot_uat.apikey;
        }
        if(req.body.botName === "NeBo Legal"){
                clientId=config.credentials_legalbot_prod.appId;
                clientSecret=config.credentials_legalbot_prod.apikey;
        }	

        
        var isAnonymous = req.body.isAnonymous || false;
        var aud = req.body.aud || "https://idproxy.kore.com/authorize";
        var fName = req.body.fName;
        var lName = req.body.lName;
        var options = {
            "iat": new Date().getTime(),
            "exp": new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
            "aud": aud,
            "iss": clientId,
            "sub": identity,
            "isAnonymous": isAnonymous
        }
        var headers = {};
        if(fName || lName) {
        headers.header = {
        "fName" : fName,
        "lName" : lName
        }
        }
        var token = jwt.sign(options, clientSecret, headers);
        res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Referrer-Policy","origin-when-cross-origin, strict-origin-when-cross-origin");
	res.header("Content-Security-Policy","default-src 'none'");
        res.send({"jwt":token});
        });
 app.get('/ping', function(req, res) {
               
                res.header("Access-Control-Allow-Origin","*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Referrer-Policy","origin-when-cross-origin, strict-origin-when-cross-origin");
                res.header("Content-Security-Policy","default-src 'none'");
                res.send("pong");
                });
console.log("JWT service request received" + port);
app.listen(port);
