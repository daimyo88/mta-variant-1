const logout = async (req, res, next) => {
    res.clearCookie("citbo_token");
    res.json({});
  };

module.exports = logout;