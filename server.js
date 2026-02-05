const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Student = require("./models/Student");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
const mongoURI = "mongodb://127.0.0.1:27017/emereld-college";
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => res.redirect("/login"));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "login.html")));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "public", "form.html")));

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "student" && password === "student@123") {
        res.redirect("/home");
    } else {
        res.send("<h2>Invalid Username or Password</h2><a href='/login'>Try again</a>");
    }
});

// API for Registration
app.post("/api/register", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json({ message: "✅ Registration submitted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "❌ Error saving registration!" });
    }
});

const PORT = process.env.PORT || 3000;

const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`);
    });

    server.on("error", err => {
        if (err.code === "EADDRINUSE") {
            startServer(port + 1); // try next port silently
        }
    });
};

startServer(PORT);








