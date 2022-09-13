const router = require('express').Router()

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// serves up db.json upon HTTP GET to /api/notes
router.get("/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        };
    });
});

// reads, adds, and rewrites db.json on HTTP POST
router.post("/notes", (req, res) => {
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
router.delete("/notes/:id", (req, res) =>{
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

module.exports = router;