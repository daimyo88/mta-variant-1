const logout = async (req, res, next) => {
    res.clearCookie("mta1_token");
    res.json({});
  };

module.exports = logout;