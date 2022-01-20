const User = require("../../models/user");
const Transport = require("../../models/transport");
const HttpError = require("../../utils/http-error");
const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  try {
    const { transport } = req.body;
    const requestedTransport = await Transport.findById(transport._id);

    if (!requestedTransport) {
      throw new HttpError("item-not-found", 404);
    }

    const owner = await User.findById(requestedTransport.user);

    if (!owner) {
      throw new HttpError("user-not-found", 404);
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await requestedTransport.remove({ session: sess });
    owner.transports.pull(requestedTransport);
    await owner.save({ session: sess });
    await sess.commitTransaction();

    res.json({ successMessage: "transport-deleted" });
  } catch (e) {
    return next(e);
  }
};
