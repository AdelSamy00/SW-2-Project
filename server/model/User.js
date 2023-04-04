const conn = require('../config/connection');

class User {
  async getUserByEmail(email) {
    try {
      const result = await conn.awaitQuery('select * from users where ?', {
        email: email,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getUserByID(id) {
    try {
      const result = await conn.awaitQuery('select * from users where ?', {
        id: id,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async createUser(req, res, token) {
    const data = req.body;
    try {
      const result = await conn.awaitQuery(
        'insert into users set ?',
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          token: token,
        },
        (err, result) => {
          if (err) {
            res.statusCode = 210;
            res.json({ messege: 'failed to save user' });
          } else {
            res.status(200).json({
              messege:
                'created succsessfully and yo well wait to approve your request',
            });
          }
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  async userLogin(email, password) {
    try {
      const result = await conn.awaitQuery(
        'select * from users where ? and ?',
        [{ email: email }, { password: password }]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getHistory(userID) {
    try {
      const result = await conn.awaitQuery(
        'select * from history join books on books.ISBN =history.book_ISBN join borrowed on borrowed.book_ISBN = books.ISBN WHERE history.?',
        {
          user_id: userID,
        }
      );
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = User;
