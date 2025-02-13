const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

// Corrected the typo 'extended:true6' to 'extended: true'
app.use(express.urlencoded({ extended: true }));

// Removed the extra space in "view engine"
app.set("view engine", "ejs");

// Fixed syntax: added a comma after "views" and corrected the path
app.set("views", path.join(__dirname, "views"));

// Fixed incorrect usage of 'app.set' for static files, should be 'app.use'
app.use(express.static(path.join(__dirname, "public")));
let posts = [
    {
        username : "Md shafatullah",
        content : "i Love coding"
    },
    {
        username : "Love babar ",
        content : "i Love swimming"
    },
    {
        username : "Piyus sharnma",
        content : "i Love dancing"
    },
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
