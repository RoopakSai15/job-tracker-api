const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../utils/token");
const { User } = require("../models")

exports.register = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required"})
  }

  const password_hash = await bcrypt.hash(password, 10)

  try {
    const user = await User.create({ email, password_hash })
    res.status(201).json({ id: user.id, email: user.email })
  } catch (err) {
    res.status(400).json({ error: "email already exists" })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required"})
  }

  const user = await User.findOne({ where: { email }})
  if (!user) {
    return res.status(401).json({ message: "user not found"})
  }

  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) {
    return res.status(401).json({ message: "invalid credentials"})
  }

  const accessToken = signAccessToken({
    userId: user.id,
    role: user.role
  });

  const refreshToken = signRefreshToken({
    userId: user.id
  });

  await user.update({ refresh_token: refreshToken });

  res.json({ accessToken, refreshToken });
}

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findByPk(decoded.userId);

    if (!user || user.refresh_token !== refreshToken) {
      return res.sendStatus(403);
    }

    const newAccessToken = signAccessToken({ 
      userId: user.id,
      role: user.role
    });
    res.json({ accessToken: newAccessToken });
  } catch {
    res.sendStatus(403);
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(400);

  const user = await User.findOne({
    where: { refresh_token: refreshToken }
  });

  if (user) {
    await user.update({ refresh_token: null });
  }

  res.sendStatus(204);
};
