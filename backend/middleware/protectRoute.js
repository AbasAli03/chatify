import jwt from "jsonwebtoken";
import User from "../models/User.js";
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "no token" });
    }

    const decodedUserId = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedUserId) {
      return res.status(404).json({ error: "invalid token" });
    }
    // get the user object from the db without the password
    const user = await User.findById(decodedUserId.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    req.user = user;
    // user is verifyed
    next();
  } catch (error) {}
};

export default protectRoute;
