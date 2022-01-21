const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../../utils/http-error");
const User = require("../../models/user");

require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const { firstName, lastName, password } = req.body;
    const token = req.cookies.mta1_user;
    let user, hashedPassword;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findById(decodedToken._id);

    if (!user) {
      throw new HttpError("user-does-not-exist", 403);
    }

    if (user.confirmedEmail) {
      throw new HttpError("account-already-created", 403);
    }

    hashedPassword = await bcrypt.hash(password, 12);

    user.firstName = firstName;
    user.lastName = lastName;
    user.password = hashedPassword;
    user.confirmedEmail = true;
    user.save();

    const authToken = user.generateAuthToken();
    res
      .clearCookie("mta1_user")
      .cookie("mta1_token", authToken, { httpOnly: true })
      .json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
  } catch (e) {
    return next(e);
  }
};
