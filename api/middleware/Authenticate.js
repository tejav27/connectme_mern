const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  
  async isLoggedIn(req, res, next) {
    try {
      const user = verifyToken(req);
      if (!user) {
        throw new Error();
      } 
      console.log("going to another level");
      next();
    } catch (error) {
      res.status(401).send({ error: "Unauthorized" });
    }
  },
};

function verifyToken(req) {
  const token = req.header("Authorization").replace("Bearer ", "");
  // const data = jwt.verify(token, process.env.JWT_SECRET);
  const data = jwt.verify(token, "secret");
  console.log("tokn verified", data);
  return data;
}
