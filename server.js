if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");
const noteController = require("./controller/noteController");

const userController = require("./controller/userController");

const app = express();

app.use(express.json());
app.use(cors());

connectDb();

app.post("/signup", userController.signup);
app.post("/login", userController.login);

app.get("/notes", noteController.fetchNotes)
app.get("/notes/:id", noteController.fetchNote)
app.post("/notes", noteController.createNote)
app.put("/notes/:id", noteController.updateNote)
app.delete("/notes/:id", noteController.deleteNote)

app.listen(process.env.PORT)