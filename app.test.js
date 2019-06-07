"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("./app");
const packageInfo = require("./package.json");

chai.use(chaiHttp);
const { expect } = chai;

describe("API server", () => {
  it("should return JSON", async () => {
    expect(await chai.request(app).get("/"))
      .to.have.status(200)
      .and.to.be.json.and.to.have.own.property("body")
      .that.is.a("object");
  });

  it("should expose project version", async () => {
    expect((await chai.request(app).get("/")).body).to.have.property("version", packageInfo.version);
  });
});
