const User = require("../../models/user");
const HttpError = require("../../utils/http-error");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/send-email");
const text = require("../../emails/texts");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role } = req.body;

    const userId = req.params.uid;
    let requestedUser,
      successMessage = "profile-updated";
    requestedUser = await User.findById(userId, "-password");

    if (!requestedUser) {
      throw new new HttpError("user-not-found", 404)();
    }

    if (role !== requestedUser.role && req.user.role !== "admin") {
      throw new HttpError("not-authorized", 401);
    }

    requestedUser.firstName = firstName;
    requestedUser.lastName = lastName;
    requestedUser.role = role;

    // changing email
    if (requestedUser.email !== email) {
      successMessage = "profile-updated-check-email";

      const token = jwt.sign(
        {
          _id: requestedUser._id,
          email: email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "240h" }
      );

      const to = [
        {
          name: requestedUser.firstName + " " + requestedUser.lastName,
          email: email,
        },
      ];

      const replaceOptions = {
        "[first-name]": requestedUser.firstName,
        "[last-name]": requestedUser.lastName,
      };

      const subject = text.changeEmail.subject;
      const emailText = text.changeEmail.text;
      const linkText = text.changeEmail.link;

      const linkUrl = process.env.BASE_URL + "/change-email/" + token;
      const link = {
        url: linkUrl,
        text: linkText,
      };

      sendEmail({ to, subject, emailText, link, replaceOptions });
    }

    await requestedUser.save();
    res.json({ successMessage });
  } catch (err) {
    return next(err);
  }
};
