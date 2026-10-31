const express = require("express");
const jwt = require("jsonwebtoken");// validate if the user is already signup id yes it remembers the user via || used for authnetication and authorization how does it authnticate is check weather it is a valid uses a JWT(randomly generated sting is returend to the user and every time the user login this string is used to aunthticate  ) 
const cors = require("cors");
const path = require("path");
// FIX: Imported JWT_SECRET from middleware to keep secret synchronized
const { authMiddleware, JWT_SECRET } = require("./middleware");

// FIX: Initialize express app before calling app.use()
const app = express();
app.use(cors());
app.use(express.json());
// Serve frontend static files

app.use(express.static(path.join(__dirname, "../Frontend")));

// In-memory database 
let USERS_ID = 1;
let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUES_ID = 1;

const USERS = [];
const ORGANIZATIONS = [];
const BOARDS = [];
const ISSUES = [];

// CREATE (POST) endpoints 
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(u => u.username === username);
    if (userExists) {
        return res.status(411).json({
            message: "User with this username already exists"
        });
    }

    USERS.push({
        username,
        password,
        id: USERS_ID++
    });

    res.json({
        message: "You have signed up successfully"
    });
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(u => u.username === username && u.password === password);
    // FIX: Added 'return' so execution stops immediately on incorrect credentials
    if (!userExists) {
        return res.status(403).json({
            message: "Incorrect credentials"
        });
    }

    // FIX: Using standardized JWT_SECRET
    const token = jwt.sign({
        userId: userExists.id }, JWT_SECRET);

    res.json({
        token
    });
});

// AUTHENTICATED ROUTE - ORGANIZATION
app.post("/organization", authMiddleware, (req, res) => {
    const userId = req.userId;
    ORGANIZATIONS.push({
        id: ORGANIZATION_ID++,
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    });

    res.json({
        message: "Org created",
        id: ORGANIZATION_ID - 1
    });
});

app.post("/add-member-to-organization", authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserUsername = req.body.memberUserUsername;

    const organization = ORGANIZATIONS.find(org => org.id === organizationId);

    if (!organization || organization.admin !== userId) {
        return res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        });
    }

    const memberUser = USERS.find(u => u.username === memberUserUsername);

    if (!memberUser) {
        return res.status(411).json({
            message: "No user with this username exists in our db"
        });
    }

    // Avoid duplicate member
    if (!organization.members.includes(memberUser.id)) {
        organization.members.push(memberUser.id);
    }

    res.json({
        message: "New member added!"
    });
});

// FIX: Implemented POST /board
app.post("/board", authMiddleware, (req, res) => {
    const userId = req.userId;
    const { title, organizationId } = req.body;

    const org = ORGANIZATIONS.find(o => o.id === organizationId);
    if (!org || (org.admin !== userId && !org.members.includes(userId))) {
        return res.status(403).json({
            message: "Organization not found or you are not a member"
        });
    }

    const newBoard = {
        id: BOARD_ID++,
        title,
        organizationId,
        createdBy: userId
    };
    BOARDS.push(newBoard);

    res.json({
        message: "Board created",
        board: newBoard
    });
});

// FIX: Implemented POST /issue
app.post("/issue", authMiddleware, (req, res) => {
    const userId = req.userId;
    const { title, description, boardId, status } = req.body;

    const board = BOARDS.find(b => b.id === boardId);
    if (!board) {
        return res.status(404).json({
            message: "Board does not exist"
        });
    }

    const newIssue = {
        id: ISSUES_ID++,
        title,
        description,
        boardId,
        status: status || "todo", // Default status: 'todo'
        createdBy: userId
    };
    ISSUES.push(newIssue);

    res.json({
        message: "Issue created",
        issue: newIssue
    });
});

// READ (GET) endpoints
app.get("/organization", authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = parseInt(req.query.organizationId);

    const organization = ORGANIZATIONS.find(org => org.id === organizationId);

    if (!organization || organization.admin !== userId) {
        return res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        });
    }

    res.json({
        organization: {
            ...organization,
            members: organization.members.map(memberId => {
                const user = USERS.find(user => user.id === memberId);
                return {
                    id: user.id,
                    username: user.username
                };
            })
        }
    });
});

// FIX: Implemented GET /boards
app.get("/boards", authMiddleware, (req, res) => {
    const organizationId = parseInt(req.query.organizationId);
    const orgBoards = organizationId 
        ? BOARDS.filter(b => b.organizationId === organizationId)
        : BOARDS;

    res.json({
        boards: orgBoards
    });
});

// FIX: Implemented GET /issues
app.get("/issues", authMiddleware, (req, res) => {
    const boardId = parseInt(req.query.boardId);
    const boardIssues = boardId 
        ? ISSUES.filter(i => i.boardId === boardId)
        : ISSUES;

    res.json({
        issues: boardIssues
    });
});

// FIX: Implemented GET /members
app.get("/members", authMiddleware, (req, res) => {
    const organizationId = parseInt(req.query.organizationId);
    const organization = ORGANIZATIONS.find(org => org.id === organizationId);

    if (!organization) {
        return res.status(404).json({
            message: "Organization not found"
        });
    }

    const memberDetails = organization.members.map(memberId => {
        const user = USERS.find(u => u.id === memberId);
        return { id: user?.id, username: user?.username };
    });

    res.json({
        admin: organization.admin,
        members: memberDetails
    });
});

// FIX: Implemented PUT /issues (update issue status, title, description)
app.put("/issues", authMiddleware, (req, res) => {
    const { issueId, title, description, status } = req.body;
    const issue = ISSUES.find(i => i.id === issueId);

    if (!issue) {
        return res.status(404).json({
            message: "Issue not found"
        });
    }

    if (title !== undefined) issue.title = title;
    if (description !== undefined) issue.description = description;
    if (status !== undefined) issue.status = status;

    res.json({
        message: "Issue updated successfully",
        issue
    });
});

// DELETE member from organization
app.delete("/members", authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserUsername = req.body.memberUserUsername;

    const organization = ORGANIZATIONS.find(org => org.id === organizationId);

    if (!organization || organization.admin !== userId) {
        return res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        });
    }

    const memberUser = USERS.find(u => u.username === memberUserUsername);

    if (!memberUser) {
        return res.status(411).json({
            message: "No user with this username exists in our db"
        });
    }

    organization.members = organization.members.filter(id => id !== memberUser.id);

    res.json({
        message: "member deleted!"
    });
});

app.listen(3000, () => {
    console.log("Week-10 Trello Clone server running on port 3000");
});