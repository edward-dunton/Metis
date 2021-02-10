//Imports
const express = require("express");
const sqlite3 = require("sqlite3");
const mailValidator = require("email-validator");

//Connect to database
console.log("Connecting to db");
const db = sqlite3.cached.Database("metis.db");
console.log("Connected to db!")

const app = express();

//Sets up the app to serve files the public folder
app.use(express.static("react-frontend/build"));

/*
  API requests:

  app.get('ENDPOINT PATH', async (req, res) => {
    FUNCTION BODY
  }

  req provides information on the request

  res is the response the server provides

  Arugments are passed as child to req.params
  Ex.
  req.params.somevalue

  HTML pages can be provided by res.sendFile(...)

  See https://expressjs.com/en/api.html, in particular the response and requirements sections 
  And https://github.com/mapbox/node-sqlite3/wiki/API for the SQLite documentation
*/

//Create user
app.get('/createUser', async (req, res) => {
  if (!mailValidator.validate(req.params.email)) {
    //email failed to validate
  }

  //Find institution
  const instDomain = req.params.email.split("@")[1];
  await db.get("SELECT InstitutionId FROM Institution WHERE Domain = ?", instDomain, (err, row) => {
    //Checks that a valid institution has been found
    if (row === undefined) {
      //Invalid email hostname
    }

    //Inst id in row.InstitutionId 
    //Don't forget to rehash passwords

  });
});


app.listen(3000, () => console.log("Listening"));
