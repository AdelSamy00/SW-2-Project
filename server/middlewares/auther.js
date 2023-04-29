const User = require('../repository/User');

const user = new User();

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  //console.log(token);
  const userID = req.headers.userid;
  //console.log(userID);
  if (!token) {
    return res.status(403).json({ message: 'you are not a authorization.' });
  } else if (token) {
    const returnedUser = await user.getUserByID(userID);
    if (returnedUser[0].token == token) {
      next();
    } else {
      return res.status(403).json({ message: 'invalid token.' });
    }
  }
};

module.exports = auth;
