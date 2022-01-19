const City = require("../../models/city");
const Region = require("../../models/region");
const HttpError = require("../../utils/http-error");
const mongoose = require("mongoose");

require("dotenv").config();

const createLocation = async (req, res, next) => {
  try {
    const { name, region } = req.body;

    const existingCity = await City.findOne({ name: name });
    
    if (existingCity) {
      throw new HttpError("location-exists", 422);
    }
   
    const requestedRegion = await Region.findById(region);
    
    if (!requestedRegion) {
      throw new HttpError("location-not-found", 404);
    }
    
    const newCity = new City({
      name,
      region: requestedRegion,
    });

    const sess = await mongoose.startSession();
    sess.startTransaction();

    requestedRegion.cities.push(newCity._id);
    
    await newCity.save({ session: sess });
    await requestedRegion.save({ session: sess });

    await sess.commitTransaction();

    res.json({ successMessage: "location-created" });

  } catch (err) {
    return next(err);
  }
};

module.exports = createLocation;
