const axios = require("../axios/sendingBlueEmail");
require("dotenv").config();

const sendEmail = async (options) => {
  const sender = {
    name: process.env.SENDER_NAME,
    email: process.env.SENDER_EMAIL,
  };

  let { to, subject, emailText, replaceOptions, additionalHtml, link } =
    options;
  const url = "https://api.sendinblue.com/v3/smtp/email";
  let text, htmlContent;

  if (!replaceOptions) {
    replaceOptions = {};
  }

  if (!additionalHtml) {
    additionalHtml = "";
  }

  if (link) {
    additionalHtml += `<div class="link-cont">
                                <a target="blank" href="${link.url}">${link.text}</a>
                            </div>`;
  }

  additionalHtml += '<div class="signature">signature</div>';

  text = emailText;
  for (const key in replaceOptions) {
    text = text.replace(key, replaceOptions[key]);
    subject = subject.replace(key, replaceOptions[key]);
  }

  htmlContent = `<html>
        <head>
            <style>
                .link-cont {
                    margin: 40px 0;
                }
                .link-cont a {
                    color: #fff;
                    font-weight: bold;
                    background-color: #5289B5;
                    padding: 12px 30px;
                    font-size: 16px;
                    text-decoration: none;
                }
                .signature {
                    margin-top: 30px;
                }
                .signature p {
                    margin: 0;
                }
            </style>
        </head>
        <body style="background-color: #F6F6F6;font-family: Arial, sans-serif;">
            <div style="max-width:600px;margin: 0 auto;background-color: #ffffff;">
                <div style="padding: 30px 15px">
                ${text}
                ${additionalHtml}
                </div>
            </div>
        </body>
    </html>`;

  const data = {
    sender,
    to,
    subject,
    htmlContent,
  };

  try {
    await axios.post(url, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendEmail;
