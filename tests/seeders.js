const { User } = require("../models")
const bcyrpt = require("bcrypt")

const seedAdmin = async () => {
  const hashed = await bcyrpt.hash("admin123", 10)

  const admin = User.create({
  email: "admin@test.com",
  password_hash: hashed,
  role: "admin" 
  })
  return admin
}

const seedRegularUser = async () => {
  const hashed = await bcyrpt.hash("user123", 10)

  const regularUser = User.create({
  email: "user@test.com",
  password_hash: hashed,
  role: "user" 
  })
  return regularUser
}

module.exports = {
  seedAdmin,
  regularUser
}