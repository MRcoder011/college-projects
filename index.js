const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: "1a",
        username: "Md Shafatullah",
        content: "I love coding"
    },
    {
        id: "2a",
        username: "Love Babar",
        content: "I love swimming"
    },
    {
        id: "3a",
        username: "Piyush Sharma",
        content: "I love dancing"
    }
];

app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = Math.random().toString(36).substr(2, 5); // Generate a random ID
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found!");
    }

    res.render("show", { post }); // Passing post data to the template
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
