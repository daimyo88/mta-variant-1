const City = require("../../models/city");
const Region = require("../../models/region");
const HttpError = require("../../utils/http-error");
const mongoose = require("mongoose");

const deleteLocation = async (req, res, next) => {
  try {
    const { city } = req.body;
    const requestedCity = await City.findById(city._id);

    if (!requestedCity) {
      throw new HttpError("item-not-found", 404);
    }

    const region = await Region.findById(requestedCity.region);

    if (!region) {
      throw new HttpError("item-not-found", 404);
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await requestedCity.remove({ session: sess });
    region.cities.pull(requestedCity);
    await region.save({ session: sess });
    await sess.commitTransaction();

    res.json({ successMessage: "location-deleted" });
  } catch (e) {
    return next(e);
  }
};

module.exports = deleteLocation;
