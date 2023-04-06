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
      const result = await conn.awaitQuery('select * from history WHERE ?', {
        user_id: userID,
      });
      //console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getAprovalRequests(userID) {
    try {
      const result = await conn.awaitQuery(
        'select * from history WHERE ? and ?',
        [
          {
            user_id: userID,
          },
          { status: 'aproval' },
        ]
      );
      //console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async returnBook(userID, bookISBN, res) {
    try {
      await conn.awaitQuery('update history set ? where ? and ?', [
        { status: 'Returned' },
        { book_ISBN: bookISBN },
        { user_id: userID },
      ]);
      await conn.awaitQuery('update books set ? where ?', [
        { isBorrowed: 0 },
        { ISBN: bookISBN },
      ]);
      await conn.awaitQuery('Delete from borrowed where ? and ?', [
        { user_id: userID },
        { book_ISBN: bookISBN },
      ]);
      res.status(200);
    } catch (error) {
      throw error;
    }
  }
  async updateUserLimits(id, limit) {
    try {
      //console.log(limit);
      const result = await conn.awaitQuery('update users set ? where ? ', [
        { limited_requests: limit },
        {
          id: id,
        },
      ]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }
}
module.exports = User;
