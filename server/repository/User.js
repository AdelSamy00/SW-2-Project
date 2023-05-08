const conn = require('../config/connection');
const BookForUser = require('./BookForUser');

class User extends BookForUser {
  async getUserByEmail(email) {
    try {
      const user = await conn.awaitQuery('select * from users where ?', {
        email: email,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByID(id) {
    try {
      const user = await conn.awaitQuery('select * from users where ?', {
        id: id,
      });
      return user;
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
      const history = await conn.awaitQuery('select * from history WHERE ?', {
        user_id: userID,
      });
      return history;
    } catch (error) {
      throw error;
    }
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
  async updateUserHistory(bookISBN, userID, bookStartDate, bookEndDate) {
    try {
      await conn.awaitQuery('update history set ? where ? and ? and ? and ?', [
        { status: 'Returned' },
        { book_ISBN: bookISBN },
        { user_id: userID },
        { book_startDate: bookStartDate },
        { book_endDate: bookEndDate },
      ]);
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
      await this.updateUserHistory(
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
  async setRequstToHistory(userID, bookISBN, book) {
    try {
      await conn.awaitQuery('insert into history set ?', {
        user_id: userID,
        book_ISBN: bookISBN,
        book_title: book.title,
        book_author: book.author,
        book_subject: book.subject,
        book_img_url: book.img_url,
      });
    } catch (error) {
      throw error;
    }
  }
  // Override
  async getRequestToBorrow(userID, bookISBN, res) {
    try {
      const book = await this.getAllDetailsOfBook(bookISBN);
      //console.log(bookTitle);
      const exist = await this.handelBorrowedTable(userID, bookISBN);
      //console.log(Object.keys(exist).length);
      if (Object.keys(exist).length == 0) {
        await conn.awaitQuery('insert into borrowed set ?', {
          user_id: userID,
          book_ISBN: bookISBN,
        });
        await this.setRequstToHistory(userID, bookISBN, book);
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
module.exports = User;
