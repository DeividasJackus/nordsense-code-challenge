"use strict";

const boom = require("@hapi/boom");
const joi = require("@hapi/joi");

// A wrapper for asynchronous route handlers to ensure errors are caught and normalized
// This allows us to use async-await handlers in which we simply throw instead of calling next()
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err.isBoom ? err : boom.badImplementation(err)));
};

function validateInput(data, expectedSchema) {
  const results = joi.validate(data, joi.object().keys(expectedSchema));
  if (results.error) throw boom.badRequest(results.error);
}

module.exports = {
  asyncHandler,
  validateInput,
};
