"use strict";

const getBearing = require("@turf/bearing").default;
const { featureCollection, point } = require("@turf/helpers");
const { getCoord } = require("@turf/invariant");
const nearestPoint = require("@turf/nearest-point").default;

const { intersections } = require("../db/geospatial");

// Based on https://stackoverflow.com/a/25867068/9282204
function degreesToCardinalDirection(degrees) {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.floor(degrees / 22.5 + 0.5) % 16];
}

function getNearestIntersection({ latitude, longitude }) {
  const givenPoint = point([longitude, latitude]);

  const nearestIntersection = nearestPoint(
    givenPoint,
    featureCollection(
      intersections.map((intersection) =>
        point([intersection.longitude, intersection.latitude], { name: intersection.name }, { id: intersection.id }),
      ),
    ),
  );

  const bearing = getBearing(nearestIntersection, givenPoint); // Angle of the provided point in relation to the intersection
  const direction = degreesToCardinalDirection(bearing); // Cardinal direction of the provided point in relation to the intersection

  return {
    point: {
      latitude,
      longitude,
    },
    nearestIntersection: {
      id: nearestIntersection.id,
      name: nearestIntersection.properties.name,
      latitude: getCoord(nearestIntersection)[1],
      longitude: getCoord(nearestIntersection)[0],
    },
    distance: nearestIntersection.properties.distanceToPoint, // Distance in kilometers between the provided point & the intersection
    bearing,
    direction,
  };
}

module.exports = {
  getNearestIntersection,
};
