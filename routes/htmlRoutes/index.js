const router = express().Router()
const path = require('path');

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