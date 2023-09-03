import chai, { expect } from "chai";
import sinon from "sinon";
import nock from "nock";
import { login, getMyProducts } from "./library";
import { API_URL } from "./constants";
chai.use(require("chai-as-promised"));

describe("Library", () => {
  afterEach(() => {
    nock.cleanAll();
    sinon.restore();
  });

  describe("login", () => {
    it("should login successfully", async () => {
      const mockResponse = {
        token: "testToken",
      };
      nock(API_URL).post("/App/api/Logon").reply(200, mockResponse);
      const result = await login("testUser", "testPass");
      expect(result).to.deep.equal(mockResponse);
    });

    it("should throw an error on unsuccessful login", async () => {
      nock(API_URL).post("/App/api/Logon").reply(400, "Error logging in");
      await expect(login("testUser", "testPass")).to.be.rejectedWith(
        Error,
        "HTTP error! Status: 400. Body: Error logging in",
      );
    });
  });

  describe("getMyProducts", () => {
    it("should fetch products successfully", async () => {
      const mockResponse = {
        misProductos: [{ alias: "testProduct" }],
      };
      nock(API_URL, {
        reqheaders: {
          cookie: "lkId=testToken",
        },
      })
        .get("/srv/api/mis-productos")
        .reply(200, mockResponse);
      const result = await getMyProducts("testToken");
      expect(result).to.deep.equal(mockResponse);
    });

    it("should throw an error on unsuccessful fetch", async () => {
      nock(API_URL, {
        reqheaders: {
          cookie: "lkId=testToken",
        },
      })
        .get("/srv/api/mis-productos")
        .reply(400, "Error fetching products");
      await expect(getMyProducts("testToken")).to.be.rejectedWith(
        Error,
        "HTTP error! Status: 400. Body: Error fetching products",
      );
    });
  });
});
