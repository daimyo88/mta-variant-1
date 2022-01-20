const Transport = require("../../models/transport");
const HttpError = require("../../utils/http-error");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const { model, maxWeight, height, volume, category, coated } = req.body;

    const transportId = req.params.sid;
    const transport = await Transport.findById(transportId);

    if (!transport) {
      throw new new HttpError("item-not-found", 404)();
    }

    transport.vehicleModel = model;
    transport.height = height;
    transport.maxWeight = maxWeight;
    transport.volume = volume;
    transport.category = category;
    transport.coated = coated;

    await transport.save();
    res.json({ successMessage: "info-updated" });
  } catch (err) {
    return next(err);
  }
};
