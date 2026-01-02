const app = require("./app");
const sequelize = require("./config/database");

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected");

    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });
  } catch (err) {
    console.error("Startup error:", err);
  }
})();
