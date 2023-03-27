const conn = require('../config/connection');
const Book = require('./Book');

class User extends Book {
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
  async createUser(req, res) {
    const data = req.body;
    await conn.query(
      'insert into users set ?',
      {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      },
      (err, result) => {
        if (err) {
          res.statusCode = 400;
          res.json({ massege: 'failed to save user' });
        } else {
          res.json({
            massege:
              'created succsessfully and yo well wait to approve your request',
          });
        }
      }
    );
  }
  async userLogin(email, password) {
    try {
      const result = await conn.awaitQuery(
        'select * from users where ? and ?',
        [{ email: email }, { password: password }]
      );
      //console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }
  getBorrowedBook(req, res, bookISBN) {
    conn.query(
      'select * from books where ?',
      { ISBN: bookISBN },
      (err, result, fields) => {
        if (err) {
          console.log('err');
        } else {
          const data = JSON.parse(JSON.stringify(result));
          res.json(result);
          return data[0];
        }
      }
    );
  }
  borrowedRequest(req, res, userID, bookISBN) {}
}
module.exports = User;
