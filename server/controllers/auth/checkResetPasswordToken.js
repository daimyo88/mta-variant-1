const HttpError = require("../../utils/http-error");
const getUser = require("../../utils/get-user");

require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const { token } = req.body;
    const user = await getUser(token, next);

    if (!user) {
      throw new HttpError("user-does-not-exist", 404);
    }

    res.cookie("mta1_fp_user", user.token, { httpOnly: true }).json({});
  } catch (e) {
    return next(e);
  }
};
