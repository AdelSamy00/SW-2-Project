const conn = require('../config/connection');

class History {
  user_id;
  book_ISBN;
  book_title;
  book_author;
  book_subject;
  book_img_url;
  book_startDate;
  book_endDate;
  status;

  constructor(
    user_id,
    book_ISBN,
    book_title,
    book_author,
    book_subject,
    book_img_url,
    book_startDate,
    book_endDate,
    status
  ) {
    this.user_id = user_id;
    this.book_ISBN = book_ISBN;
    this.book_title = book_title;
    this.book_author = book_author;
    this.book_subject = book_subject;
    this.book_img_url = book_img_url;
    this.book_startDate = book_startDate;
    this.book_endDate = book_endDate;
    this.status = status;
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
}
module.exports = History;
