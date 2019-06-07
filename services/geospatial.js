"use strict";

const getBearing = require("@turf/bearing").default;
const { featureCollection, point } = require("@turf/helpers");
const { getCoord } = require("@turf/invariant");
const nearestPoint = require("@turf/nearest-point").default;

const { intersections } = require("../db/geospatial");

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
    distance: nearestIntersection.properties.distanceToPoint,
    bearing: getBearing(nearestIntersection, givenPoint),
  };
}

module.exports = {
  getNearestIntersection,
};
