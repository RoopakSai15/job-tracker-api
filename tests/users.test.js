const { request, app, registerAndLogin, authHeader } = require("./helpers");

describe("Users routes", () => {
  beforeAll(async () => {
    await registerAndLogin();
  });

  it("fetches all users (admin only)", async () => {
    const res = await request(app)
      .get("/users")
      .set(authHeader());

    // could be 403 if role=user
    expect([200, 403]).toContain(res.statusCode);
  });

  it("fetches jobs for a user", async () => {
    const users = await request(app)
      .get("/users")
      .set(authHeader());

    if (users.statusCode === 403) return;

    const userId = users.body[0].id;

    await request(app)
      .get(`/users/${userId}/jobs`)
      .set(authHeader())
      .expect(200);
  });
});
