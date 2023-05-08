class AdminServices {
  constructor(admin) {
    this.admin = admin;
  }

  async getAllUsers() {
    try {
      const AllUser = await this.admin.getAllUsers();
      return AllUser;
    } catch (error) {
      throw error;
    }
  }

  async getNewUsers() {
    try {
      const allNewUsers = await this.admin.getNewUsers();
      return allNewUsers;
    } catch (error) {
      throw error;
    }
  }

  async approveUser(userID, reqLimit, res) {
    try {
      this.admin.approveUser(userID, reqLimit, res);
    } catch (error) {
      throw error;
    }
  }

  async updateUserLimits(id, limit) {
    try {
      this.admin.updateUserLimits(id, limit);
    } catch (error) {
      throw error;
    }
  }

  async getAllBorrowedRequest() {
    try {
      const allRequest = await this.admin.getAllBorrowedRequest();
      return allRequest;
    } catch (error) {
      throw error;
    }
  }

  async approveBorrowedRequest(id, ISBN, startDate, endDate, res) {
    try {
      await this.admin.approveBorrowedRequest(
        id,
        ISBN,
        startDate,
        endDate,
        res
      );
    } catch (error) {
      throw error;
    }
  }

  async setStatusOfBookRequest(ISBN) {
    try {
      await this.admin.setStatusOfBookRequest(ISBN);
    } catch (error) {
      throw error;
    }
  }

  async rejectBorrowedRequest(id, ISBN) {
    try {
      const rejected = await this.admin.rejectBorrowedRequest(id, ISBN);
      return rejected;
    } catch (error) {
      throw error;
    }
  }

  async updateStatusInHistory(id, ISBN, status) {
    try {
      await this.admin.updateStatusInHistory(id, ISBN, status);
    } catch (error) {
      throw error;
    }
  }

  async updateDateInHistory(id, ISBN, startDate, endDate) {
    try {
      await this.admin.updateDateInHistory(id, ISBN, startDate, endDate);
    } catch (error) {
      throw error;
    }
  }

  async deleteBookByISBN(ISBN) {
    try {
      const DeletedBook = await this.admin.deleteBookByISBN(ISBN);
      return DeletedBook;
    } catch (error) {
      throw error;
    }
  }
  async addNewBook(bookData, filePath, res) {
    try {
      await this.admin.addNewBook(bookData, filePath, res);
    } catch (error) {
      throw error;
    }
  }

  async updateBook(data, res) {
    try {
      const updatedBook = await this.admin.updateBook(data, res);
      return updatedBook;
    } catch (error) {
      throw error;
    }
  }

  async rejectUser(id) {
    try {
      const rejectedUser = await this.admin.rejectUser(id);
      return rejectedUser;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = AdminServices;
