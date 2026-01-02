const { request, app } = require("./helpers");

describe("Auth routes", () => {
  it("registers a user", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "a@test.com", password: "pass123" })
      .expect(201);
  });

  it("logs in a user and returns tokens", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "a@test.com", password: "pass123" })
      .expect(200);

    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });

  it("rejects invalid credentials", async () => {
    await request(app)
      .post("/auth/login")
      .send({ email: "a@test.com", password: "wrong" })
      .expect(401);
  });

  it("refreshes access token", async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ email: "a@test.com", password: "pass123" });
    
    expect(login.body.refreshToken).toBeDefined();

    const res = await request(app)
      .post("/auth/refresh")
      .send({ refreshToken: login.body.refreshToken })
      .expect(200);

    expect(res.body.accessToken).toBeDefined();
  });

  it("logs out and revokes refresh token", async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ email: "a@test.com", password: "pass123" });

    await request(app)
      .post("/auth/logout")
      .send({ refreshToken: login.body.refreshToken })
      .expect(204);
  });
});
