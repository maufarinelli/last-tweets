'use strict';
var env = require('node-env-file');
env(__dirname + '/config.env');

var express = require('express'),
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
            twitter.getUserTimeline({screen_name: 'AppDirect', count: '30'},
                function(error) {reject(error)},
                function(data) {
                    resolve(JSON.parse(data));
                });
        });

        var laughingSquidPromise = new Promise((resolve, reject) => {
            twitter.getUserTimeline({screen_name: 'LaughingSquid', count: '30'},
                function(error) {reject(error)},
                function(data) {
                    resolve(JSON.parse(data));
                });
        });

        var techCrunchPromise = new Promise((resolve, reject) => {
            twitter.getUserTimeline({screen_name: 'TechCrunch', count: '30'},
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
        "consumerKey": process.env.consumerKey,
        "consumerSecret": process.env.consumerSecret,
        "accessToken": process.env.accessToken,
        "accessTokenSecret": process.env.accessTokenSecret,
        "callBackUrl": process.env.callBackUrl
    };
    return new Twitter(config);
};

app.listen(4000);
module.exports = app;

console.log('Server running at http://localhost:4000/');
