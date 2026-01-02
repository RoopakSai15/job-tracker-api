const request = require('supertest')
const app = require('../src/app')
const { sequelize } =require('../models')
const User = require('../models/user');
const Job = require('../models/job');


let accessToken
let refreshToken

const registerAndLogin = async () => {
  await request(app)
    .post("/auth/register")
    .send({ email: "test@example.com", password: "password123"});
  
  const res = await request(app).post("/auth/login").send({ email : "test@example.com", password: "password123"})

  accessToken = res.body.accessToken
  refreshToken = res.body.refreshToken

  return { accessToken, refreshToken }
}

const authHeader = () => ({
  Authorization: `Bearer ${accessToken}`
})

const setupTestDB = async () => {
  await sequelize.sync({ force: true });
};

const teardownTestDB = async () => {
  if (sequelize) {
    await sequelize.truncate({ cascade: true, restartIdentity: true });
  }
};

const closeDB = async () => {
  if (sequelize) {
    await sequelize.close();
  }
};

module.exports = {
  app,
  sequelize,
  request,
  registerAndLogin,
  authHeader
}