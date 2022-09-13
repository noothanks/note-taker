const express = require("express");
const path = require('path');
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
//converts post data into usable key/value pairs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serves public directory as static
app.use(express.static("public"));



// translates /notes to /public/notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

// serves up db.json upon HTTP GET to /api/notes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        };
    });
});

// reads, adds, and rewrites db.json on HTTP POST
app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let notes = JSON.parse(data) || [];
            let noteID = uuidv4();
            const newNote = req.body;
            console.log(noteID);
            notes.push({...newNote, id: noteID});
            fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json("Successfully added note!");
                    console.log("Note added");
                }
            });
        };
    });
});

// deletes individual notes based on UUID-generated ID #
app.delete("/api/notes/:id", (req, res) =>{
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let notes = JSON.parse(data) || [];
            const id = req.params.id;
            let deletedNote = notes.filter(note => (note.id !== id));
            fs.writeFile("./db/db.json", JSON.stringify(deletedNote), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json("Successfully deleted note!");
                    console.log("Note deleted.");
                }
            })
        };
    });
});

// catch-all to redirect to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// sets up Express to listen on PORT (see const's above)
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});