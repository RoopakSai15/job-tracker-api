const { request, app, registerAndLogin, authHeader } = require("./helpers");

let jobId;

describe("Jobs routes", () => {
  beforeAll(async () => {
    await registerAndLogin();
  });

  it("blocks unauthenticated access", async () => {
    await request(app).get("/jobs").expect(401);
  });

  it("creates a job", async () => {
    const res = await request(app)
      .post("/jobs")
      .set(authHeader())
      .send({
        company: "Google",
        role: "SWE"
      })
      .expect(201);

    jobId = res.body.id;
  });

  it("fetches jobs for logged-in user", async () => {
    const res = await request(app)
      .get("/jobs")
      .set(authHeader())
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it("fetches a single job", async () => {
    await request(app)
      .get(`/jobs/${jobId}`)
      .set(authHeader())
      .expect(200);
  });

  it("updates a job", async () => {
    await request(app)
      .put(`/jobs/${jobId}`)
      .set(authHeader())
      .send({ status: "interview" })
      .expect(200);
  });

  it("deletes a job", async () => {
    await request(app)
      .delete(`/jobs/${jobId}`)
      .set(authHeader())
      .expect(204);
  });
});
