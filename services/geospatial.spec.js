"use strict";

const chai = require("chai");

const { getNearestIntersection } = require("./geospatial");

const { expect } = chai;

describe("#getNearestIntersection()", () => {
  it("should return the ID of the intersection", () => {
    expect(getNearestIntersection({ latitude: 0, longitude: 0 }))
      .to.have.own.property("nearestIntersection")
      .that.has.own.property("id");
  });

  it("should return the name of the intersection", () => {
    expect(getNearestIntersection({ latitude: 0, longitude: 0 }))
      .to.have.own.property("nearestIntersection")
      .that.has.own.property("name");
  });

  it("should return the distance", () => {
    expect(getNearestIntersection({ latitude: 0, longitude: 0 }))
      .to.have.own.property("distance")
      .that.is.a("number");
  });

  it("should return the bearing", () => {
    expect(getNearestIntersection({ latitude: 0, longitude: 0 }))
      .to.have.own.property("bearing")
      .that.is.a("number")
      .and.is.at.least(-180)
      .and.is.at.most(180);
  });

  it("should return the direction", () => {
    expect(getNearestIntersection({ latitude: 0, longitude: 0 }))
      .to.have.own.property("direction")
      .that.is.oneOf([
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
      ]);
  });

  it("should correctly identify the closest intersection", () => {
    const res = getNearestIntersection({ latitude: 37.743527, longitude: -122.387629 });

    expect(res).to.have.own.property("direction", "SSE");

    expect(res)
      .to.have.own.property("distance")
      .that.is.a("number")
      .and.is.at.most(0.01);
  });

  it("should identify an actual intersection", () => {
    const res = getNearestIntersection({ latitude: 37.73362861, longitude: -122.3840238 });

    expect(res)
      .to.have.own.property("nearestIntersection")
      .that.has.own.property("id", "308320");

    expect(res).to.have.own.property("distance", 0);
    expect(res).to.have.own.property("bearing", 0);
    expect(res).to.have.own.property("direction", "N");
  });
});
