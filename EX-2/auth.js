/** @format */

// auth.js
const VALID_TOKEN = "xyz123";

export default function authenticate(req, res, next) {
  const token = req.query.token;

  if (!token || token !== VALID_TOKEN) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or missing token" });
  }
  next();
}
