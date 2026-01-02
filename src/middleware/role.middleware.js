module.exports = (requiredRole) => {
  return (req, res, next) => {
    if (req.userRole !== requiredRole) {
      return res.sendStatus(403);
    }
    next();
  };
};
