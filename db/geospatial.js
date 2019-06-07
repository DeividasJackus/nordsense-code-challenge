"use strict";

const fs = require("fs");
const csvParse = require("csv-parse/lib/sync");

// Load intersections from provided CSV
const csvContents = fs.readFileSync(`${__dirname}/intersections.csv`).toString();
const intersections = csvParse(csvContents, {
  columns: true,
  skip_empty_lines: true,
}).map((intersection) => ({
  id: intersection.GISObjectID,
  name: `${intersection.streetname} & ${intersection.cross_street}`,
  latitude: Number(intersection.Latitude),
  longitude: Number(intersection.Longitude),
}));

module.exports = {
  intersections,
};
