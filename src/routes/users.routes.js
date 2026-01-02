const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controller");

router.post("/", controller.createUser);
router.get("/", controller.getUsers);
router.get("/:id/jobs", controller.getUserJobs)

module.exports = router;