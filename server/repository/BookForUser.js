const Book = require('./Book');

class BookForUser extends Book {
  async getRequestToBorrow(userID, bookISBN, res) {}
  async handelBorrowedTable(userID, bookISBN) {}
  async getAllDetailsOfBook(bookISBN) {}
  async setRequstToHistory(userID, bookISBN, book) {}
  async returnBook(userID, bookISBN, res) {}
  async deleteBookrequest(bookISBN, userID) {}
  async updateBookRequest(bookISBN) {}
  async updateUserHistory(bookISBN, userID) {}
}
module.exports = BookForUser;
