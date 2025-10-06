import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "form.html"));
});


// Connect to MongoDB
mongoose.connect("mongodb+srv://raphachegekamunu:41831655@cluster0.ddv4ceq.mongodb.net/crudDatabase?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log(err));

// Schema + Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});
const User = mongoose.model("User", userSchema);

// 🟢 CREATE
app.post("/users", async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

// 🟣 READ ALL
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// 🔵 READ ONE
app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// 🟠 UPDATE
app.put("/users/:id", async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// 🔴 DELETE
app.delete("/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
});

app.listen(4000, () => console.log("🚀 Server running on http://localhost:4000"));
