
const express = require("express");  //// This is to import this dependencies 
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");

const app = express();  /// This is to use the libraries/dependencies 
app.use(express.json()); //This is a middleware function

const notes = []; //Created two array both take input as string to store the data    
const users = [{}]; //This is storing data in variables 



//Signup route(more of a endpoint) that stores email and password 
// POST = To send some data 

// Syntax: app.post(path, callback [, callback ...])
app.post("/signup", function(req, res) {
    const username = req.body.username;  
    const password = req.body.password;
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(403).json({
            message: "User with this username already exists"
        })
    }
    users.push({
        username: username, 
        password: password
    })

    res.json({
        message: "You have signed up"
    })})


    //Signin Endpoint 
app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username && user.password === password);

    if (!userExists) {
        res.status(403).json({
            message: "Incorrect credentials"
        })
        return;}

    // json web tokens
    const token = jwt.sign({
        username: username
    }, "/");

    res.json({
        token: token
    }) })


// POST - Create a note -- AUTHENTICATED ENDPOINT
app.post("/notes", authMiddleware, function(req, res) {

    const username = req.username;
    const note = req.body.note;
    notes.push({note, username});

    res.json({
        message: "Done!"
    })
})

// GET - get all my notes -- AUTHENTICATED ENDPOINT
app.get("/notes", authMiddleware, function(req, res) {
    const username = req.username;
    const userNotes = notes.filter(note => note.username === username);

    res.json({
        notes: userNotes
    })
})

app.get("/", function(req, res) {
  res.sendFile("/Bootcamp/Web-Dev Cohort/week-9 (Auth)/frontend/index.html");
})

app.get("/signup", function(req, res) {
  res.sendFile("/Bootcamp/Web-Dev Cohort/week-9 (Auth)/frontend/signup.html");
})
app.get("/signin", function(req, res) {
  res.sendFile("/Bootcamp/Web-Dev Cohort/week-9 (Auth)/frontend/signin.html");
})

//This route uses port 3000
app.listen(3000, () => {
  console.log("server is started");
});




  