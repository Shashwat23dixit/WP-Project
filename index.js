// mongodb
var express = require("express");
var app = express();
var port = 3000;
var path=require("path")
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let csspath=path.join(__dirname,"./css");
let jspath=path.join(__dirname,"./js");
let imgpath=path.join(__dirname);

app.use(express.static(csspath))
app.use(express.static(jspath))
app.use(express.static(imgpath))


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Wp_Project");
var nameSchema = new mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  phone: String,
});
var User = mongoose.model("Login", nameSchema);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname , "index.html"));
});

app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    .then((item) => {
      res.send("Name saved to database");
    })
    .catch((err) => {
      res.status(400).send("Unable to save to database");
    });
});

var nschema = new mongoose.Schema({
    oname: String,
    onum: String,
    pay: String,
    add: String,
    ptype: String,
    code: String,
  });
  var User = mongoose.model("shashwat", nschema);
  
  app.post("/details", (req, res) => {
    var myData = new User(req.body);
    myData
      .save()
      .then((item) => {
        res.send("Name saved to database");
      })
      .catch((err) => {
        res.status(400).send("Unable to save to database");
      });
  });

app.listen(port, () => {
  console.log("Server listening on port " + port);
});