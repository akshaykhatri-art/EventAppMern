import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token =
    req.headers["authorization"] || req.query.token || req.body.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is required" });
  }

  try {
    const decoded = jwt.verify(token, "akshayhere");
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;
