const { v4: uuidv4, v4 } = require('uuid');

class UserServices {
  constructor(user, book, history) {
    this.user = user;
    this.book = book;
    this.history = history;
  }

  async getUserByEmail(email) {
    try {
      const user = await this.user.getUserByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(req, res) {
    try {
      const token = uuidv4();
      await this.user.createUser(req, res, token);
    } catch (error) {
      throw error;
    }
  }

  async userLogin(email, password) {
    try {
      const user = await this.user.userLogin(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getBookStatus(ISBN) {
    try {
      const bookDetails = await this.book.getBookStatus(ISBN);
      return bookDetails;
    } catch (error) {
      throw error;
    }
  }

  async getRequestToBorrow(id, ISBN, res) {
    try {
      await this.user.getRequestToBorrow(id, ISBN, res);
    } catch (error) {
      throw error;
    }
  }

  async getBookByISBN(ISBN) {
    try {
      const bookDetails = await this.book.getBookByISBN(ISBN);
      return bookDetails;
    } catch (error) {
      throw error;
    }
  }

  async getHistory(userID) {
    try {
      const userHistory = await this.history.getHistory(userID);
      return userHistory;
    } catch (error) {
      throw error;
    }
  }

  async getAprovalRequests(userID) {
    try {
      const aprovalRequests = await this.user.getAprovalRequests(userID);
      return aprovalRequests;
    } catch (error) {
      throw error;
    }
  }

  async returnBook(id, ISBN, startDate, endDate, res) {
    try {
      await this.user.returnBook(id, ISBN, startDate, endDate, res);
    } catch (error) {
      throw error;
    }
  }
  async updateUserLimits(id, limits) {
    try {
      await this.user.updateUserLimits(id, limits);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserServices;
