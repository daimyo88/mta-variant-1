const Region = require("../../models/region");
const HttpError = require("../../utils/http-error");
require("dotenv").config();

const updateLocation = async (req, res, next) => {
  try {
    const { name } = req.body;
    const regionId = req.params.pid;
    const region = await Region.findById(regionId);

    
    if (!region) {
        throw new HttpError("item-not-found", 404);
    }
    
    if(name !== region.name) {
        const existingRegion = await Region.findOne({ name: name });
    
        if (existingRegion) {
          throw new HttpError("location-exists", 422);
        }
    
        region.name = name;
    
        await region.save();
    }
    
    res.json({ successMessage: "info-updated" });
    
  } catch (err) {
    return next(err);
  }
};

module.exports = updateLocation;
