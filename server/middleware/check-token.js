const getUser = require("../utils/get-user");
const HttpError = require("../utils/http-error");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.mta1_token;
    const user = await getUser(token);

    if (!user) {
      throw new HttpError("expired-token", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    return next(err);
  }
};
