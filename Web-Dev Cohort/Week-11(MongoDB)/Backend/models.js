const mongoose = require("mongoose"); //imports the library called Mongoose into file.

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
});

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: mongoose.Types.ObjectId
});

const userModel = mongoose.model("users", UserSchema);
const todoModel = mongoose.model("todos", TodoSchema);

const OrganizationSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: mongoose.Types.ObjectId,
    members: Array
});
const organizationModel = mongoose.model("organizations", OrganizationSchema);

// FIX: Connection to MongoDB.
// Uses process.env.MONGO_URI if defined, otherwise falls back to your local MongoDB instance or Atlas connection string.
// REPLACE the string below with your Atlas connection string if you are using MongoDB Atlas:
// e.g. "mongodb+srv://<username>:<password>@cluster0.mongodb.net/todo-app?retryWrites=true&w=majority"
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todo-app";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((err) => console.error("MongoDB connection error:", err.message));

module.exports = {
    userModel,
    todoModel,
    organizationModel
};