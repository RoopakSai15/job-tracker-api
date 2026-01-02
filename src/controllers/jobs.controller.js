const { Job } = require("../models");

exports.createJob = async (req, res) => {
  const { company, role, status } = req.body;

  if (!company || !role) {
    return res.status(400).json({ error: "company and role required" });
  }

  const job = await Job.create({
    company,
    role,
    status,
    user_id: req.userId
  });

  res.status(201).json(job);
};

exports.getJobs = async (req, res) => {
  const jobs = await Job.findAll({
    where: { user_id: req.userId }
  });
  res.json(jobs);
};

exports.getJob = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job) return res.sendStatus(404);
  res.json(job);
};

exports.updateJob = async (req, res) => {
  const { company, role, status } = req.body

  if (company === "" || role === "") {
    return res.status(400).json({
      error: "company and role cannot be empty"
    });
  }

  const job = await Job.findByPk(req.params.id);
  if (!job) return res.sendStatus(404);
  await job.update(req.body);
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job) return res.sendStatus(404);
  await job.destroy();
  res.sendStatus(204);
};
