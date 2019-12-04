const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require("mongodb");
const path = require("path");
const ping = require('ping');
const ObjectID = require('mongodb').ObjectID;

// Change the Database, Collection, and Server Connection String according to your information.
const mongoDBDatabase = "canon"
const mongoDBCollection = "printers"

// This connection string is with no authentication on the localhost.
const mongoDBServerConnectionString = "mongodb://127.0.0.1:27017"

//Change this to configure the port that the application will be listening on.
const listeningPort = 80




const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"build/index.html"))
})

app.post("/ping", (req,res) => {
    //console.log(req)
    //console.log(req.body)
    ping.promise.probe(req.body.printer, {timeout: 1}).then((val) => {
        var body = req.body
        //console.log(val)
        body.status = val.alive
        //console.log("Success")
        //console.log(body)
        res.send(body)
        res.end()
    }).catch((val) => {
        var body = req.body.printer
        body.status = val.alive
        //console.log("Failed")
        //console.log(body)
        res.send(body)
        res.end()
    })
    
 

})

app.post("/addprinter", (req,res) => {
    console.log(req.body)
    var db = mongodb.MongoClient
    db.connect(mongoDBServerConnectionString, (err, mydb) => {

        mydb.db(mongoDBDatabase).collection(mongoDBCollection).insertOne(req.body)
        mydb.close()
        res.send("Success")  
        res.end()    
    })
})

app.post("/editprinter", (req,res) => {
    console.log(req.body)
    var db = mongodb.MongoClient
    db.connect(mongoDBServerConnectionString, (err, mydb) => {
        mydb.db(mongoDBDatabase).collection(mongoDBCollection).updateOne({_id: new ObjectID(req.body.id) }, { $set: {printer: req.body.printer, ipaddress:req.body.ipaddress, notes: req.body.notes}}, function(err, records){
            if (err) throw err
            //console.log(records)
          })
        mydb.close()
        res.send("Success")  
        res.end()    
    })
})

app.post("/deleteprinter", (req, res) => {
    console.log(req.body)
    var db = mongodb.MongoClient
    db.connect(mongoDBServerConnectionString, (err, mydb) => {
        mydb.db(mongoDBDatabase).collection(mongoDBCollection).deleteOne({_id: new ObjectID(req.body.id) })
        mydb.close()
        res.send("Success")   
        res.end()   
    })
})

app.get("/getprinters", (req,res) => {
    var db = mongodb.MongoClient
    db.connect(mongoDBServerConnectionString, (err, mydb) => {
        mydb.db(mongoDBDatabase).collection(mongoDBCollection).find({}).sort({printer: 1}).toArray((err, list) =>{
            //console.log(list)
            res.send(list)
            mydb.close()
            res.end()
        })
    
        
    })
    
})



app.listen(listeningPort, () =>
  console.log('Express server is running on localhost:'+listeningPort.toString())
);