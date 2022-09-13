const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// Middleware
//converts post data into usable key/value pairs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serves public directory as static
app.use(express.static("public"));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// sets up Express to listen on PORT (see const's above)
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});