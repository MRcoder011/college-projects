const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Corrected import for uuid

const app = express();
const port = 8080;

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this to parse JSON bodies

// Set view engine to EJS and specify views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Sample posts array with unique IDs
let posts = [
    {
        id: uuidv4(),
        username: "Md Shafatullah",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "Love Babar",
        content: "I love swimming"
    },
    {
        id: uuidv4(),
        username: "Piyush Sharma",
        content: "I love dancing"
    }
];

// Route to display all posts
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

// Route to render the form for creating a new post
app.get("/posts/new", (req, res) => {
    res.render("new");
});

// Route to handle form submission and create a new post
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    const id = uuidv4(); // Generate a unique ID for the new post
    posts.push({ id, username, content }); // Add the new post to the array
    res.redirect("/posts"); // Redirect to the posts page
});

// Route to display a single post by ID
app.get("/posts/:id", (req, res) => {
    const { id } = req.params; // Retrieve the ID from the URL
    const post = posts.find((p) => p.id === id); // Find the post with the matching ID

    if (!post) {
        return res.status(404).send("Post not found!"); // Handle case where post is not found
    }

    res.render("show", { post }); // Render the "show" template with the post data
});

// Route to render the edit form for a specific post
app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params; // Retrieve the ID from the URL
    const post = posts.find((p) => p.id === id); // Find the post with the matching ID

    if (!post) {
        return res.status(404).send("Post not found!"); // Handle case where post is not found
    }

    res.render("edit", { post }); // Render the "edit" template with the post data
});

// Route to handle updating a post
app.patch("/posts/:id", (req, res) => {
    const { id } = req.params; // Retrieve the ID from the URL
    const { content } = req.body; // Retrieve updated content from the request body

    const post = posts.find((p) => p.id === id); // Find the post with the matching ID

    if (!post) {
        return res.status(404).send("Post not found!"); // Handle case where post is not found
    }

    post.content = content; // Update the post content
    res.redirect(`/posts/${id}`); // Redirect to the updated post
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// Error handling for server startup
app.on("error", (err) => {
    console.error("Server error:", err);
});