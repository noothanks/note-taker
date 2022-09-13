const router = require('express').Router()
const path = require('path');

const fs= require('fs')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

// translates /notes to /public/notes.html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
  });

// catch-all to redirect to index.html
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;