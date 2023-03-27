const router = require('express').Router();
const conn = require('../config/connection');
const Book = require('./Book');

class Admin extends Book {
  getAllUsers = () => {
    try {
      const result = conn.awaitQuery('select * from users');
      return result;
    } catch (error) {
      throw error;
    }
  };

  async getNewUsers() {
    try {
      const result = await conn.awaitQuery('select * from users where ?', {
        status: 0,
      });
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async approveUser(req, res, id) {
    conn.query(
      'update users set ? where ?',
      [{ status: 'active' }, { id: id }],
      (err, result, fields) => {
        if (err) {
          res.statusCode = 500;
          res.json({ massage: 'samething Wrong.' });
        } else {
          res.json({ massage: 'Approve Complate.' });
        }
      }
    );
  }
}
module.exports = Admin;
