const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: "majority",
  },
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connection was successfully estabilished to database");
});

const peopleSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
});

const People = mongoose.model("People", peopleSchema);

app.get("/contactlist", function (req, res) {
  People.find({})
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/contactlist", (req, res) => {
  People.create(req.body)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/contactlist/:id", function (req, res) {
  var id = req.params.id;
  // console.log(id)
  People.findOne({ _id: id })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/contactlist/:id", function (req, res) {
  var id = req.params.id;
  People.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.error("Error finding and modifying document:", err);
    });
});

app.delete("/contactlist/:id", function (req, res) {
  var id = req.params.id;
  People.findOneAndDelete({ _id: id })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.error("Error finding and deleting document:", err);
    });
});

app.use(express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
