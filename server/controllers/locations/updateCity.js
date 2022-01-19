const City = require("../../models/city");
const Region = require("../../models/region");
const HttpError = require("../../utils/http-error");
const mongoose = require("mongoose");
require("dotenv").config();

const updateLocation = async (req, res, next) => {
  try {
    const { name, region } = req.body;
    let oldRegion, newRegion;
    const cityId = req.params.pid;
    const city = await City.findById(cityId);

    if (!city) {
      throw new HttpError("item-not-found", 404);
    }

    if (name !== city.name) {
      const existingCity = await City.findOne({ name: name });

      if (existingCity) {
        throw new HttpError("location-exists", 422);
      }

      city.name = name;
    }

    const oldRegionId = city.region.toString();

    if (oldRegionId !== region) {
      oldRegion = await Region.findById(oldRegionId);
      newRegion = await Region.findById(region);

      if (!oldRegion || !newRegion) {
        throw new new HttpError("item-not-found", 404)();
      }
      city.region = region;
      oldRegion.cities.pull(city);
      newRegion.cities.push(city);
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();

    if (oldRegionId !== region) {
      await oldRegion.save({ session: sess });
      await newRegion.save({ session: sess });
    }

    await city.save({ session: sess });

    await sess.commitTransaction();

    res.json({ successMessage: "info-updated" });
  } catch (err) {
    return next(err);
  }
};

module.exports = updateLocation;
