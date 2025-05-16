/** @format */

// validateQuery.js
export default function validateQuery(req, res, next) {
  const { minCredits, maxCredits } = req.query;

  if (minCredits && isNaN(parseInt(minCredits))) {
    return res
      .status(400)
      .json({ error: "minCredits must be a valid integer" });
  }

  if (maxCredits && isNaN(parseInt(maxCredits))) {
    return res
      .status(400)
      .json({ error: "maxCredits must be a valid integer" });
  }

  if (minCredits && maxCredits && parseInt(minCredits) > parseInt(maxCredits)) {
    return res
      .status(400)
      .json({ error: "minCredits cannot be greater than maxCredits" });
  }

  next();
}
