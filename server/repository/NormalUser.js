const conn = require('../config/connection');
const BookForUser = require('./BookForUser');
const History = require('./History');
const User = require('./User');

class NormalUser extends (BookForUser, User) {
  constructor(
    id,
    name,
    email,
    password,
    phone,
    status,
    type,
    token,
    limited_requests,
    history
  ) {
    super(
      id,
      name,
      email,
      password,
      phone,
      status,
      type,
      token,
      limited_requests
    );
    this.history = history;
  }

  async getAprovalRequests(userID) {
    try {
      const aprovalRequests = await conn.awaitQuery(
        'select * from history WHERE ? and ?',
        [
          {
            user_id: userID,
          },
          { status: 'aproval' },
        ]
      );
      return aprovalRequests;
    } catch (error) {
      throw error;
    }
  }
  // Override
  async deleteBookrequest(bookISBN, userID) {
    try {
      await conn.awaitQuery('Delete from borrowed where ? and ?', [
        { user_id: userID },
        { book_ISBN: bookISBN },
      ]);
    } catch (error) {
      throw error;
    }
  }
  // Override
  async updateBookRequest(bookISBN) {
    try {
      await conn.awaitQuery('update books set ? where ?', [
        { isBorrowed: 0 },
        { ISBN: bookISBN },
      ]);
    } catch (error) {
      throw error;
    }
  }
  // Override
  async returnBook(userID, bookISBN, bookStartDate, bookEndDate, res) {
    try {
      const history = new History();
      await history.updateUserHistory(
        bookISBN,
        userID,
        bookStartDate,
        bookEndDate
      );
      await this.updateBookRequest(bookISBN);
      await this.deleteBookrequest(bookISBN, userID);
      res.status(200);
    } catch (error) {
      throw error;
    }
  }

  async updateUserLimits(id, limit) {
    try {
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
  // Override
  async handelBorrowedTable(userID, bookISBN) {
    try {
      const result = await conn.awaitQuery(
        'select * from borrowed where ? and ?',
        [{ user_id: userID }, { book_ISBN: bookISBN }]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  // Override
  async getAllDetailsOfBook(bookISBN) {
    try {
      const result = await conn.awaitQuery('select * from books where ?', {
        ISBN: bookISBN,
      });
      return result[0];
    } catch (error) {
      throw error;
    }
  }
  // Override
  async getRequestToBorrow(userID, bookISBN, res) {
    try {
      const history = new History();
      const book = await this.getAllDetailsOfBook(bookISBN);
      //console.log(bookTitle);
      const exist = await this.handelBorrowedTable(userID, bookISBN);
      //console.log(Object.keys(exist).length);
      if (Object.keys(exist).length == 0) {
        await conn.awaitQuery('insert into borrowed set ?', {
          user_id: userID,
          book_ISBN: bookISBN,
        });
        await history.setRequstToHistory(userID, bookISBN, book);
        res.status(200).json({ message: 'Request send.' });
      } else {
        res
          .status(401)
          .json({ message: 'you are already send this request.', data: exist });
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = NormalUser;
