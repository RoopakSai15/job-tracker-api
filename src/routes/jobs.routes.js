const express = require("express");
const router = express.Router();
const controller = require("../controllers/jobs.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, controller.createJob);
router.get("/", auth, controller.getJobs);
router.get("/:id", auth, controller.getJob);
router.put("/:id", auth, controller.updateJob);
router.delete("/:id", auth, controller.deleteJob);

module.exports = router
