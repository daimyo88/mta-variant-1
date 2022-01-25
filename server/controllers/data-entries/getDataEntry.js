const DataEntry = require("../../models/data-entry");
const HttpError = require("../../utils/http-error");

module.exports = async (req, res, next) => {
  try {
    const dataEntryId = req.params.did;
    const dataEntry = await DataEntry.findById(dataEntryId)
      .populate("user", "firstName lastName")
      .lean();

    if (!dataEntry) {
      throw new HttpError("item-not-found", 404);
    }

    res.json(dataEntry);
  } catch (e) {
    return next(e);
  }
};
