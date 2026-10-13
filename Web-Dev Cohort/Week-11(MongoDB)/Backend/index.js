const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
// FIX: Import models and authMiddleware with standardized JWT_SECRET
const { authMiddleware, JWT_SECRET } = require("./middleware");
const { todoModel, userModel } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// Salt rounds for password hashing
const SALT_ROUNDS = 10;

// SIGNUP endpoint with bcrypt.hash()
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    try {
        // FIX: Check if username already exists (only check username, not password)
        const userExist = await userModel.findOne({ username });
        if (userExist) {
            return res.status(403).json({
                message: "User with this username already exists"
            });
        }

        // FIX: Hash password with bcrypt before storing
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await userModel.create({
            username: username,
            password: hashedPassword
        });

        res.json({
            message: "Signed up successfully",
            id: newUser._id
        });
    } catch (err) {
        res.status(500).json({
            message: "Error signing up",
            error: err.message
        });
    }
});

// SIGNIN endpoint with bcrypt.compare()
app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    try {
        // Find user by username
        const user = await userModel.findOne({ username });
        
        // FIX: Added 'return' on incorrect credentials so execution does not fall through
        if (!user) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        // FIX: Use bcrypt.compare() instead of plain password match
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        // FIX: Sign token using synchronized JWT_SECRET
        const token = jwt.sign({
            userId: user._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        });
    } catch (err) {
        res.status(500).json({
            message: "Error signing in",
            error: err.message
        });
    }
});

// FIX: CREATE TODO - Migrated from TODOS array to todoModel.create()
app.post("/todo", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    try {
        const newTodo = await todoModel.create({
            title: title,
            description: description,
            userId: userId
        });

        res.json({
            message: "Todo made",
            todo: newTodo
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating todo",
            error: err.message
        });
    }
});

// FIX: DELETE TODO - Migrated from TODOS array to todoModel.findOneAndDelete()
app.delete("/todo/:todoId", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const todoId = req.params.todoId;

    try {
        // Only delete if the todo belongs to the authenticated user
        const deletedTodo = await todoModel.findOneAndDelete({
            _id: todoId,
            userId: userId
        });

        if (deletedTodo) {
            res.json({
                message: "Deleted"
            });
        } else {
            res.status(404).json({
                message: "Either todo doesnt exist or this is not your todo"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error deleting todo",
            error: err.message
        });
    }
});

// FIX: GET TODOS - Migrated from TODOS array to todoModel.find()
app.get("/todos", authMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        const userTodos = await todoModel.find({ userId: userId });
        res.json({
            todos: userTodos
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching todos",
            error: err.message
        });
    }
});

app.listen(3000, () => {
    console.log("Week-11 MongoDB Backend running on port 3000");
});
