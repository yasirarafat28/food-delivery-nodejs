import app from "../app";

const request = require("supertest");
describe("Order Creation testing", () => {
  it("new order creation", async () => {
    jest.setTimeout(10 * 1000);
    let res = await request(app).get(
      "/api/purchase/history?user=62239f85dc16d90130dd0679"
    );
    expect(res.statusCode).toEqual(200);
  });
});
