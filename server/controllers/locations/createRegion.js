const Region = require("../../models/region");
const HttpError = require("../../utils/http-error");

require("dotenv").config();

const createLocation = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingLocation = await Region.findOne({ name: name });

    if (existingLocation) {
      throw new HttpError("location-exists", 422);
    }

    const newRegion = new Region({
      name,
    });

    await newRegion.save();

    res.json({ successMessage: "location-created" });
    
  } catch (err) {
    return next(err);
  }
};

module.exports = createLocation;
