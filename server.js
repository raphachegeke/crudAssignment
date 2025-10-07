// Import required modules
import express from "express";       // Express to create the server
import mongoose from "mongoose";     // Mongoose to connect to MongoDB
import bodyParser from "body-parser"; // To parse incoming data
import cors from "cors";             // To allow cross-origin requests

const app = express(); // Set up the Express app

// Use middlewares to handle CORS and parse JSON data
app.use(cors()); 
app.use(bodyParser.json()); // Parse incoming JSON data
app.use(express.static("public")); // Serve static files from the "public" folder

// Import path module to handle file paths
import path from "path"; 
import { fileURLToPath } from "url";

// Get the current file name and directory path
const __filename = fileURLToPath(import.meta.url); // Get the current file name
const __dirname = path.dirname(__filename); // Get the directory of the current file

// Route to send "index.html" when visiting the homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html")); // Send "index.html" from the "public" folder
});

// Route to send "form.html" when visiting "/form"
app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "form.html")); // Send "form.html" from the "public" folder
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://techveli:Kimberly71%21@cluster0.4do64ff.mongodb.net/mongo1?retryWrites=true&w=majority")
    .then(() => console.log("✅ MongoDB Connected")) // Log if successful
    .catch(err => console.log(err)); // Log any errors if connection fails

// Define the structure of a "User" document
const userSchema = new mongoose.Schema({
    name: String,   // User's name
    email: String,  // User's email
    age: Number     // User's age
});

// Create a User model based on the schema
const User = mongoose.model("User", userSchema);

// 🟢 CREATE: Route to add a new user to the database
app.post("/users", async (req, res) => {
    const user = await User.create(req.body); // Create a new user with the data from the request
    res.json(user); // Send back the new user as a response
});

// 🟣 READ ALL: Route to get all users from the database
app.get("/users", async (req, res) => {
    const users = await User.find(); // Get all users from the database
    res.json(users); // Send back the list of users as a response
});

// 🔵 READ ONE: Route to get a single user by their ID
app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id); // Find a user by their ID
    res.json(user); // Send back the user as a response
});

// 🟠 UPDATE: Route to update an existing user's details by ID
app.put("/users/:id", async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update user by ID
    res.json(updated); // Send back the updated user as a response
});

// 🔴 DELETE: Route to delete a user by their ID
app.delete("/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id); // Delete the user by ID
    res.json({ message: "User deleted" }); // Send back a message saying the user was deleted
});

// Start the server on port 4000
app.listen(4000, () => console.log("🚀 Server running on http://localhost:4000")); // Log when the server starts






// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static("public"));

// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/form", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "form.html"));
// });


// // Connect to MongoDB
// mongoose.connect("mongodb+srv://techveli:Kimberly71%21@cluster0.4do64ff.mongodb.net/mongo1?retryWrites=true&w=majority")
//     .then(() => console.log("✅ MongoDB Connected"))
//     .catch(err => console.log(err));

// // Schema + Model
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     age: Number
// });
// const User = mongoose.model("User", userSchema);

// // 🟢 CREATE
// app.post("/users", async (req, res) => {
//     const user = await User.create(req.body);
//     res.json(user);
// });

// // 🟣 READ ALL
// app.get("/users", async (req, res) => {
//     const users = await User.find();
//     res.json(users);
// });

// // 🔵 READ ONE
// app.get("/users/:id", async (req, res) => {
//     const user = await User.findById(req.params.id);
//     res.json(user);
// });

// // 🟠 UPDATE
// app.put("/users/:id", async (req, res) => {
//     const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
// });

// // 🔴 DELETE
// app.delete("/users/:id", async (req, res) => {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "User deleted" });
// });

// app.listen(4000, () => console.log("🚀 Server running on http://localhost:4000"));
