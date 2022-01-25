const User = require("../../models/user");
const DataEntry = require("../../models/data-entry");
const HttpError = require("../../utils/http-error");

const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  try {
    const {
      departureDate,
      transportData,
      productGroup,
      dispatchCity,
      destinationCity,
      dominantArea,
      pricePerTon,
      cargoWeight,
      comment,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      throw new HttpError("user-not-found", 404);
    }

    const newDataEntry = new DataEntry({
      createdAt: new Date(),
      departureDate,
      freightData: {
        productGroup,
        dispatchCity,
        destinationCity,
        dominantArea,
        pricePerTon,
        cargoWeight,
        transportData,
      },
      comment,
      user: req.user._id,
    });

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newDataEntry.save({ session: sess });
    user.dataEntries.push(newDataEntry);
    await user.save({ session: sess });
    await sess.commitTransaction();

    res.json({ successMessage: "data-entry-created" });
  } catch (err) {
    return next(err);
  }
};
