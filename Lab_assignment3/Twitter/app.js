$(document).ready(function () {
    var twit = require('twitter-oauth');
    var username = "Yuvesh95";
    var config = {
        "consumer_key": "tKjAlq75QJSELD1ncErDk3N2xq",
        "consumer_secret": "Hy1xxbAbCB4CtT3pLiWIQIRvYkP1hHHDnleyuN3E5GW1XnLSax",
        "access_token": "166984191-cnBgBG6siwy3CXsUJB7zUH8dGmhn5uWCgRPzAJa9",
        "access_token_secret": "1KFcpf7txSW1ElzZysvRbK5RbCQdMwM9xHlz6kjFECyLf"
    }
    //var twitter = new Twitter(config);
    var twt = new twit(config);
    twt.get('favorites/list', function (error, tweets, response) {
        if(error) throw error;
        console.log(tweets);  //FAV
        console.log(response);  // RAW OBJECT.
    });
});