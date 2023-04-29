const Book = require('./Book');

class BookForAdmin extends Book {
  async addNewBook(data, imgName, res) {}
  async deleteBookByISBN(ISBN) {}
  async updateBookStatus(ISBN) {}
  async updateBorrowedRequest(ISBN, id, startDate, endDate) {}
  async approveBorrowedRequest(id, ISBN, startDate, endDate, res) {}
  async deleteBookByISBN(ISBN) {}
  async updateBook(ISBN, book, res) {}
  async getAllBorrowedRequest() {}
  async rejectBorrowedRequest(id, ISBN) {}
  async updateStatusInHistory(id, ISBN, status) {}
  async updateDateInHistory(id, ISBN, startDate, endDate) {}
}
module.exports = BookForAdmin;
