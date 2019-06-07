"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../app");

const { expect } = chai;
chai.use(chaiHttp);

describe("/geospatial API", () => {
  describe("/nearestIntersection", () => {
    it("should return the input point normalized", async () => {
      const res = await chai
        .request(app)
        .get("/geospatial/nearestIntersection")
        .query({ latitude: 1, longitude: -1 });

      expect(res.body).to.have.own.property("point");

      expect(res.body.point).to.have.own.property("latitude", 1);
      expect(res.body.point).to.have.own.property("longitude", -1);
    });

    it("should return an error given incorrect input", async () => {
      expect(await chai.request(app).get("/geospatial/nearestIntersection")).to.have.status(400);

      expect(
        await chai
          .request(app)
          .get("/geospatial/nearestIntersection")
          .query({ latitude: -91, longitude: 0 }),
      ).to.have.status(400);

      expect(
        await chai
          .request(app)
          .get("/geospatial/nearestIntersection")
          .query({ latitude: 91, longitude: 0 }),
      ).to.have.status(400);

      expect(
        await chai
          .request(app)
          .get("/geospatial/nearestIntersection")
          .query({ latitude: 0, longitude: -181 }),
      ).to.have.status(400);

      expect(
        await chai
          .request(app)
          .get("/geospatial/nearestIntersection")
          .query({ latitude: 0, longitude: 181 }),
      ).to.have.status(400);
    });
  });
});
