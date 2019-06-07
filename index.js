"use strict";

const debug = require("debug")("app");

const app = require("./app");

if (require.main === module) {
  // We're being executed directly
  debug(`Starting server in ${process.env.NODE_ENV || "development"} mode...`);

  // Listen for incoming requests
  const server = app.listen(process.env.PORT || 3000, () => {
    const { address, port } = server.address();
    console.log(`Listening for incoming connections on ${address}:${port}`);
  });
} else {
  // We're being used as a module
  module.exports = app;
}
