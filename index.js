const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); 

const app = express();
const port = 8080;
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    { id: uuidv4(), username: "Md Shafatullah", content: "I love coding" },
    { id: uuidv4(), username: "Love Babar", content: "I love swimming" },
    { id: uuidv4(), username: "Piyush Sharma", content: "I love dancing" }
];

// Display all posts
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});
app.get("/menu", (req, res) => {
    res.render("menu");
});

// Render new post form
app.get("/posts/new", (req, res) => {
    res.render("new");
});

// Create new post
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    const id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

// Display a single post
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found!");
    }
    res.render("show", { post });
});

// Render edit form
app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found!");
    }
    res.render("edit", { post });
});

// Corrected DELETE route
app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((p) => p.id !== id); // Corrected condition to properly remove the post
    res.redirect("/posts");
});

// Update a post
app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found!");
    }
    post.content = content;  
    res.redirect(`/posts/${id}`);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
