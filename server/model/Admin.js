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
  async getNewUserByID(id) {
    try {
      const result = await conn.awaitQuery(
        'select * from users where ? and ? ',
        [{ id: id }, { status: 0 }]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async approveUser(id, limit, res) {
    try {
      await conn.awaitQuery(
        'update users set ? where ?',
        [{ status: 1, limited_requests: limit }, { id: id }],
        (err) => {
          if (err) {
            return res.status(500);
          } else {
            return res.status(200);
          }
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async setStatusOfBookRequest(ISBN) {
    try {
      await conn.awaitQuery(
        'update history set ? where ?',
        [{ status: 'aproval' }, { book_ISBN: ISBN }]
        /* (err) => {
          if (err) {
            return res.status(500);
          } else {
            return res.status(200);
          }
        } */
      );
    } catch (error) {
      throw error;
    }
  }
  async approveBorrowedRequest(id, ISBN, startDate, endDate, res) {
    try {
      const result = await conn.awaitQuery(
        'update borrowed set ? where ? and ?',
        [
          { startDate: startDate, endDate: endDate, is_Borrowed: 1 },
          { user_id: id },
          { book_ISBN: ISBN },
        ],
        (err) => {
          if (err) {
            return res.status(500);
          } else {
            return res.status(200);
          }
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Admin;
