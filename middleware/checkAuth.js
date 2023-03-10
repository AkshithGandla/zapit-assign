const jwt = require("jsonwebtoken");

exports.checkAuth = async (req, res, next) => {
  const token = req.cookies.token;

  //checking for the existence of token
  if (!token) {
    return res.status(401).json({ message: "NOT authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; //adding user to request
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
