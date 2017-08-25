/**
 * Created by MAKS on 31.07.2017.
 */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://admin:KZVIILDCICHCRRAF@sl-us-south-1-portal.0.dblayer.com:19080,sl-us-south-1-portal.4.dblayer.com:19080/admin?ssl=true";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myobj = { name: "Company Inc", address: "Highway 37", qty: 16 };
    db.collection("messages").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 record inserted");
        db.close();
    });
});