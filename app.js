"use strict";

const boom = require("@hapi/boom");
const debug = require("debug")("app");
const express = require("express");
const morgan = require("morgan");

const { version } = require("./package.json");
const routers = require("./routers");

const app = express();

app.set("case sensitive routing", true);
app.set("strict routing", true);

// Log incoming requests to stdout (unless we're running tests)
if (typeof global.it !== "function") {
  app.use(morgan(app.get("env") === "development" ? "dev" : "tiny"));
}

// Use a middleware for parsing JSON requests
app.use(express.json());

app.get("/", (req, res) => res.json({ version }));

// Load routers
Object.entries(routers).forEach(([name, router]) => {
  debug(`Loading router for /${name}...`);
  app.use(`/${name}`, router);
});

// Error handling middleware for Express should be loaded after all route handlers are loaded
app.use((err, req, res, next) => {
  if (err.isServer) {
    // We'll want to log server errors to stdout
    console.error(err);
  }
  const {
    output: { statusCode, payload },
  } = err.isBoom ? err : boom.boomify(err);
  return res.status(statusCode).json(payload);
});

module.exports = app;
