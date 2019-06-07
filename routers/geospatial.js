"use strict";

const { Router } = require("express");

const { asyncHandler } = require("../utils");

const {
  geospatial: { getNearestIntersection },
} = require("../controllers");

const router = Router();

router.get("/nearestIntersection", asyncHandler(getNearestIntersection));

module.exports = router;
