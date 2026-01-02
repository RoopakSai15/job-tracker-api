const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || "devsecret"

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token"})
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next()
  } catch (err) {
    res.status(401).json({ error: "invalid token"})
  }
}