const conn = require('../config/connection');

class Book {
  getAllBooks = () => {
    try {
      const books = conn.awaitQuery('select * from books');
      return books;
    } catch (error) {
      throw error;
    }
  };

  addNewBook = (data, res) => {
    conn.query(
      'insert into books set ?',
      {
        ISBN: data.ISBN,
        title: data.title,
        author: data.author,
        subject: data.subject,
        rackNumber: data.rackNumber,
      },
      (err) => {
        if (err) {
          res.statusCode = 400;
          res.json({ massege: 'failed to save the book' });
        } else {
          res.json({ massege: 'created succsessfully' });
        }
      }
    );
  };

  async getBorrowedBook(bookISBN) {
    try {
      const result = await conn.awaitQuery('select * from books where ?', {
        ISBN: bookISBN,
      });
      return result[0];
    } catch (error) {
      throw error;
    }
  }
  async checkIfBorrowed(userID, bookISBN) {
    try {
      const result = await conn.awaitQuery(
        'select * from borrowed where ? and ?',
        [
          {
            user_id: userID,
          },
          {
            book_ISBN: bookISBN,
          },
        ]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getRequestToBorrow(userID, bookISBN) {
    try {
      const result = await conn.awaitQuery('insert into borrowed set ?', {
        user_id: userID,
        book_ISBN: bookISBN,
        isBorrowed: 0,
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Book;
