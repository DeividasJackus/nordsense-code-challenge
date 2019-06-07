"use strict";

const { intersections } = require("../db/geospatial");

function getNearestIntersection({ latitude, longitude }) {
  return { intersections, latitude, longitude };
}

module.exports = {
  getNearestIntersection,
};
