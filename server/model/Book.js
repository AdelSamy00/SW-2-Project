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
          res.json({ messege: 'failed to save the book' });
        } else {
          res.json({ messege: 'created succsessfully' });
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
  async checkIfBorrowed(bookISBN) {
    try {
      const result = await conn.awaitQuery('select * from books where ?', {
        ISBN: bookISBN,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getBookByISBN(ISBN) {
    try {
      const result = await conn.awaitQuery('select * from books where ?', {
        ISBN: ISBN,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async handelBorrowedTable(userID, bookISBN) {
    try {
      const result = await conn.awaitQuery('select * from borrowed where ?', [
        { user_id: userID },
        { book_ISBN: bookISBN },
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getRequestToBorrow(userID, bookISBN, res) {
    try {
      const exist = await this.handelBorrowedTable(userID, bookISBN);
      console.log(exist);
      if (exist.length > 0) {
        res
          .status(401)
          .json({ message: 'you are already send this request.', data: exist });
      } else {
        const result = await conn.awaitQuery('insert into borrowed set ?', {
          user_id: userID,
          book_ISBN: bookISBN,
        });
        res.status(200).json({ message: 'Request send.' });
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Book;
