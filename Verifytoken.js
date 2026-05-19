const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const getauth = req.headers["Authorization"] || req.headers["authorization"];
    const token2  = getauth.split(" ")[1];
    const verify  = jwt.verify(token2, process.env.SecretKey);

    console.log("Verifytoken - decoded:", verify); // مهم نشوف إيه جوا الـ token

    req.user = verify;
    next();
  } catch (e) {
    res.json("token not valid");
    console.log(e);
  }
};
