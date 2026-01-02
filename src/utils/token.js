const jwt = require("jsonwebtoken")

const ACCESS_SECRET = process.env.JWT_SECRET
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

exports.signAccessToken = (payload) => 
  jwt.sign(payload, ACCESS_SECRET, {expiresIn: "15m"})

exports.signRefreshToken = ( payload ) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" })

exports.verifyRefreshToken = ( payload ) => {
  jwt.verify(token, REFRESH_SECRET)
}