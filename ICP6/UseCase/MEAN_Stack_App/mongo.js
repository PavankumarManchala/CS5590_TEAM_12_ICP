/**
 * Created by karthik on 7/14/17.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

var url='mongodb://PavankumarManchala:Pawone965@ds119343.mlab.com:19343/webmobileteam12';//1.Modify this url with the credentials of your db name and password.
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

app.get('/get', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('books').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");

        });
    });

});

app.get('/delete/:toBeDeleted_id', function (req, res) {
    // 2.Connect to MongoDB . Handle the error and write the logic for deleting the desired book
        MongoClient.connect(url, function(err, db) {
            console.log(req.params);
            if(err)
            {
                res.write("Failed, Error while connecting to Database");
                res.end();
            }
            // deleting a collection/record
            var id= req.toBeDeleted_id;
            db.collection("books").deleteOne(id);
            res.end();

        });

    });
/*
app.get('/update/:toBeUpdated_id', function (req, res){
    //3.connect to MongoDB. Handle the error and write the logic for updating the selected field
    MongoClient.connect(url, function (err, db) {
       // console.log(req);

        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        //updating collection/record

        // console.log(req.query._id);
        // console.log(req.query.bookName);
        // var toBeUpdated_id = req.query._id;
        // var bookname = req.query.bookName;
        // db.collection("books").updateOne(toBeUpdated_id,);
        // var toBeUpdated_id = req.query._id;
        // var book=req.query;
        // console.log("Book name"+toBeUpdated_id);
        // var bookData={$set:{bookName:book.bookName,authorName:book.authorName, ISBN: book.ISBN }};
        // db.collection("books").updateOne();
           var toBeUpdated_id = req.query._id;
           var book=req.query.bookName;
           var isbn=req.query.ISBN;
           var authorname=req.query.authorName;
           db.collection("books").updateOne({"_id":toBeUpdated_id},{bookName:book,authorName:authorname, ISBN:isbn });
           console.log("updated a document into the books collection.");

    });
});
*/
app.get('/update/:toBeUpdated_id', function (req, res) {
    //3.connect to MongoDB. Handle the error and write the logic for updating the selected field
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var myquery = { _id: ObjectID(req.params.toBeUpdated_id)};
        var newvalues = {$set: {bookName:req.query.bookName,authorName:req.query.authorName,ISBN:req.query.ISBN } };
        db.collection("books").updateOne(myquery, newvalues,function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " record(s) updated");
            db.close();
        });
    });
});

    var insertDocument = function(db, data, callback) {
    db.collection('books').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the books collection.");
        callback();
    });
    };

    var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});