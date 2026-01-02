const { request, app } = require("./helpers");

describe("Health check", () => {
  it("returns ok", async () => {
    await request(app).get("/health").expect(200);
  });
});
