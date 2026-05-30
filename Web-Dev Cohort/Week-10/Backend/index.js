const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware.js");

let USERS_ID = 1;
let ORGANIZATION_ID = 1;
let BOARDS_ID = 1;
let ISSUES_ID = 1;

const USERS = [
  {
    Id: 1,
    username: "Hardik123",
    password: "123456",
  },
];
const ORGANIZATIONS = [
  {
    Id: 1,
    title: "zomato",
    description: "Food delivery platform",
    admin: 1,
    members: [],
  },
];
const BOARDS = [
  {
    id: 1,
    title: "Frontend website design",
    organizationId: 1,
  },
];
const ISSUE = [
  {
    Id: 1,
    title: "Make it fast",
    boardId: 1,
  },
];

const app = express();
app.use(express.json());

//CREATE

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExist = USERS.find((user) => user.username === username);
  if (userExist) {
    res.status(403).json({
      Message: "User with this username already exist",
    });
    return;
  }

  USERS.push({
    username,
    password,
    Id: USERS_ID++,
  });

  res.json({
    Msg: "You have signup successfully",
  })
})

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExist = USERS.find(
    (user) => user.username === username && user.password === password,
  );
  if (!userExist) {
    res.status(403).json({
      Message: "Incorrect Credentials",
    })
  }

  //Create a token for user
  const token = jwt.sign(
    {
      userID: userExist.id,
    },
    "password1231233",
  )

  res.json({
    token,
  })
})

//AUTHENTICATED ROUTE - MIDDLEWARE
app.post("/create-organization", authMiddleware, (req, res) => {
    const userId = req.body.userId;
    ORGANIZATIONS.push({
        Id: ORGANIZATION_ID++, 
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: [],
    })
    res.json({
        Message: "Organization created",
        Id: ORGANIZATION_ID - 1
    })
})

app.post("/add-a-member-organization", authMiddleware, (req, res) => {
 const userId = req.body.userId;
 
})

app.post("/boards", (req, res) => {})

app.post("/issues", (req, res) => {})

//GET
app.get("/boards", (req, res) => {})

app.get("/issues", (req, res) => {})

app.get("/members", (req, res) => {})

//UPDATE
app.put("/issues", (req, res) => {})

//DELETE
app.delete("/members", (req, res) => {})

app.listen(3000, () => {
  console.log("Server is Running");
})






