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
}
module.exports = Book;
