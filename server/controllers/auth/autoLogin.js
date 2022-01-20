const getUser = require('../../utils/get-user');

require('dotenv').config();

module.exports = async (req, res, next) => {

  try {

    if (req.method === 'OPTIONS') {
      return next();
    }

    const token = req.cookies.mta1_token;
    const user = await getUser(token, next);

    if(!user) {
      return res.json({});
    }

    res.json({ ...user });

  } catch(e) {
    return next(e)
  } 

}