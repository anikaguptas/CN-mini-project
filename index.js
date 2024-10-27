const { v4: uuidv4 } = require("uuid");
const express = require("express");
const methooverride = require("method-override");
const app = express();
app.use(methooverride("_method"));

const port = 8080;
app.listen(port, () => {
  console.log("port is listening");
});
const path = require("path");
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: "true" }));

let posts = [
  {
    id: uuidv4(),
    username: "anika",
    content: "sleeps",
  },
  {
    id: uuidv4(),
    username: "aniket",
    content: "armani exchange is the best",
  },
  {
    id: uuidv4(),
    username: "arun",
    content: "ayuswasth makes herbal prods ",
  },
  {
    id: uuidv4(),
    username: "anju",
    content: "medical officer ",
  },
];

app.get("/", (req, res) => {
  console.log("received a GET request");
  res.send("get received");
});

app.get("/posts", (req, res) => {
  console.log("viewing all posts");
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  console.log("trying to add new post");
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  console.log("sending new post");
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newcontent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newcontent;
  console.log(post);
  res.redirect("/posts");
});
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => post.id != id);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  console.log("edit req working");
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  console.log("id to be edited", post);
  res.render("edit.ejs", { post });
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log("id requested : ", id);
  let post = posts.find((p) => id === p.id);
  console.log(post);
  res.render("show.ejs", { post });
});
