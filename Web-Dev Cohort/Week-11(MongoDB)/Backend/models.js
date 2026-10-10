
const mongoose = require("mongoose"); //imports the library called Mongoose into file.



const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: mongoose.Types.ObjectId
});

const userModel = mongoose.model("users", UserSchema);
const todoModel = mongoose.model("todos", TodoSchema);

module.exports = {
    userModel: userModel,
    todoModel: todoModel
}


const OrganizationSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: mongoose.Types.ObjectId,
    members : Array
})
mongoose.connect("");