/** @format */

// server.js
const express = require("express");
const querystring = require("querystring");
const fs = require("fs");

const app = express();
app.get("/", (req, res) => {
  console.log(`Received ${req.method} request for ${req.url}`);

  res.status(200).end("Welcome to the Home Page");
  return;
});
app.get("/contact", (req, res) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  res.status(200).send(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
  return;
});

app.post("/contact", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const parsedBody = querystring.parse(body);
    const name = parsedBody.name;
    if (!name) {
      return res.status(400).send("Name is required");
    }
    fs.appendFile("submissions.txt", `${name}\n`, (err) => {
      if (err) {
        console.error("Error writing to file", err);
        return res.status(500).send("Internal Server Error");
      }
      console.log(`Received name: ${name}`);
      return res.status(200).send(`Thank you for your submission, ${name}!`);
    });
  });
});

app.use((req, res, next) => {
  return res.status(404).send("404 Not Found");
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
  console.log("Server is running at http://localhost:3000/contact");
});
