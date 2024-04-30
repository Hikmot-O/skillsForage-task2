const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

// Json document to represent a blog schema
let posts = [
  { id: 1, title: 'First Post', content: 'I love codingg.', comments: [] },
  { id: 2, title: 'Second Post', content: 'I am new to backend', comments: [] },
];

// Middleware
app.use(bodyParser.json());

// Routes

// Get all the blog posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Get a specific blog post by the ID
app.get('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    res.json(post);
  }
});

// Create a new blog post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content, comments: [] };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Making an update an existing blog post
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  const post = posts.find(p => p.id === postId);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    post.title = title;
    post.content = content;
    res.json(post);
  }
});

// Deleting a blog post
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === postId);
  if (index === -1) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    posts.splice(index, 1);
    res.json({ message: 'Post deleted successfully' });
  }
});

// Adding a comment to a blog post
app.post('/api/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id);
  const { text } = req.body;
  const post = posts.find(p => p.id === postId);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    post.comments.push({ text });
    res.status(201).json(post.comments);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});