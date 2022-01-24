const User = require("../../models/user");
const Region = require("../../models/region");
const HttpError = require("../../utils/http-error");

module.exports = async (req, res, next) => {
  try {
    const userId = req.query.uid;
    if (!userId) {
      throw new HttpError("item-not-found", 404);
    }

    const user = await User.findById(userId, "transports")
      .populate("transports")
      .lean();
    const regions = await Region.find({}).populate("cities").lean();

    if (!user) {
      throw new HttpError("item-not-found", 404);
    }

    res.json({
      transports: user.transports,
      locations: regions,
    });
  } catch (e) {
    return next(e);
  }
};
