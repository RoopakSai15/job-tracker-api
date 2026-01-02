const express = require("express");
const jobsRoutes = require("./routes/jobs.routes");
const usersRoutes = require("./routes/users.routes")
const authRoutes = require("./routes/auth.routes")

const app = express();
app.use(express.json());

app.use("/auth", authRoutes)
app.use("/jobs", jobsRoutes);
app.use("/users", usersRoutes)


app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});


module.exports = app;
