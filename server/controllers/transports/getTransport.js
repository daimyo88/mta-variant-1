const Transport = require("../../models/transport");
const HttpError = require("../../utils/http-error");

module.exports = async (req, res, next) => {
  try {
    const transportId = req.params.sid;
    const transport = await Transport.findById(transportId).lean();

    if (!transport) {
      throw new HttpError("item-not-found", 404);
    }

    res.json(transport);
  } catch (e) {
    return next(e);
  }
};
