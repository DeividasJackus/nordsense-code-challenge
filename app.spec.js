"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("./app");
const packageInfo = require("./package.json");

const { expect } = chai;
chai.use(chaiHttp);

describe("API server", () => {
  it("should return valid HTTP response codes for successful requests", async () => {
    expect(await chai.request(app).get("/")).to.have.status(200);
  });

  it("should return valid HTTP response codes for unsuccessful requests", async () => {
    expect(await chai.request(app).get("/non-existent")).to.have.status(404);
  });

  it("should return valid JSON", async () => {
    expect(await chai.request(app).get("/"))
      .and.to.be.json.and.to.have.own.property("body")
      .that.is.a("object");
  });

  it("should expose version", async () => {
    expect((await chai.request(app).get("/")).body).to.have.property("version", packageInfo.version);
  });
});
