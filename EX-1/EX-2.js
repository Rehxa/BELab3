/** @format */

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.status(200).send(`               
     <html>
        <head><title>Home</title></head>
        <body>
            <h1>Welcome to the Home Page</h1>
            <p>This is a simple Node.js server.</p>
        </body>
    </html>`);
});

app.get("/about", (req, res) => {
  return res.status(200).send(`                
    <html>
        <head><title>About</title></head>
        <body>
            <h1>About Us: at CADT, we love node.js!</h1>
        </body>
    </html>`);
});

app.get("/contact-us", (req, res) => {
  return res.status(200).send(`                
    <html>
        <head><title>Contact</title></head>
        <body>
            <h1>You can reach us via email...</h1>
        </body>
    </html>`);
});

app.get("/products", (req, res) => {
  return res.status(200).send(`                
    <html>
        <head><title>Products</title></head>
        <body>
            <h1>Buy one get one...</h1>
        </body>
    </html>`);
});

app.get("/projects", (req, res) => {
  return res.status(200).send(`                
    <html>
        <head><title>Projects</title></head>
        <body>
            <h1>Here are our awesome projects</h1>
        </body>
    </html>`);
});
app.use((req, res, next) => {
  return res.status(404).send(`
    <html>
        <head><title>404</title></head>
        <body>
            <h1>404 Not Found</h1>
        </body>
    </html>`);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Server running on http://localhost:3000/about");
  console.log("Server running on http://localhost:3000/contact-us");
  console.log("Server running on http://localhost:3000/products");
  console.log("Server running on http://localhost:3000/projects");
});
