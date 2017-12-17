'use strict';

var express = require('express'),
    router = express.Router(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    request = require('request'),
    Twitter = require('twitter-node-client').Twitter;

var app = express();

// enable cors
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

//rest API requirements
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/get/tweets',
    function(req, res) {
        var twitter = getTwitterAuthentification();

        var appDirectPromise = new Promise((resolve, reject) => {
            twitter.getUserTimeline({screen_name: 'AppDirect', count: '2'},
                function(error) {reject(error)},
                function(data) {
                    resolve(JSON.parse(data));
                });
        });

        var laughingSquidPromise = new Promise((resolve, reject) => {
            twitter.getUserTimeline({screen_name: 'LaughingSquid', count: '2'},
                function(error) {reject(error)},
                function(data) {
                    resolve(JSON.parse(data));
                });
        });

        var techCrunchPromise = new Promise((resolve, reject) => {
            twitter.getUserTimeline({screen_name: 'TechCrunch', count: '2'},
                function(error) {reject(error)},
                function(data) {
                    resolve(JSON.parse(data));
                });
        });

        Promise.all([appDirectPromise, laughingSquidPromise, techCrunchPromise]).then(data => {
            const response = [
                {appDirect: data[0]},
                {laughingSquid: data[1]},
                {techCrunch: data[2]}
            ];

            res.status(200);
            res.send(response);
        });
    });

var getTwitterAuthentification = () => {
    var config = {
        "consumerKey": "hDnIoCTxaPGxUdLfHJcufoAsz",
        "consumerSecret": "ohkoOU1FcAHt17GbRuI7gu8h7FxUzSat6nA07s1EtmIr4PPiWb",
        "accessToken": "219427823-rxZPdxREQAhUcPh78FlOFCXl8A3n0oViA1yfwTXO",
        "accessTokenSecret": "11m2GygY2M4TAO1B6bv0xzZMHE101QJ3SmPVR9PtzvRlV",
        "callBackUrl": "hppt://localhost:3000/twitter-callback"
    };
    return new Twitter(config);
};

app.listen(4000);
module.exports = app;

console.log('Server running at http://localhost:4000/');
