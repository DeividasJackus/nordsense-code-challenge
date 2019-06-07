"use strict";

const joi = require("@hapi/joi");

const { validateInput } = require("../utils");
const {
  geospatial: { getNearestIntersection },
} = require("../services");

module.exports = {
  getNearestIntersection: async (req, res) => {
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);

    validateInput(
      { latitude, longitude },
      {
        latitude: joi
          .number()
          .min(-90)
          .max(90),
        longitude: joi
          .number()
          .min(-180)
          .max(180),
      },
    );

    res.json({
      point: {
        latitude,
        longitude,
      },
      ...getNearestIntersection({ latitude, longitude }),
    });
  },
};
