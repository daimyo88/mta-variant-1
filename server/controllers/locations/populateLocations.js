const Region = require("../../models/region");

const populateLocations = async (req, res, next) => {
  try {
    const regions = await Region.find().populate("cities").lean();
    res.json(regions);
  } catch (e) {
    return next(e);
  }
};

module.exports = populateLocations;
