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

    if (user.confirmedEmail) {
      throw new HttpError("user-already-created", 403);
    }

    res
      .cookie("mta1_user", user.token, { httpOnly: true })
      .json({ firstName: user.firstName, lastName: user.lastName });
  } catch (e) {
    return next(e);
  }
};
