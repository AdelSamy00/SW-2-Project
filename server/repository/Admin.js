const router = require('express').Router();
const conn = require('../config/connection');
const Book = require('./Book');
const BookForAdmin = require('./BookForAdmin');

class Admin extends BookForAdmin {
  async getAllUsers() {
    try {
      const AllUsers = await conn.awaitQuery('select * from users');
      return AllUsers;
    } catch (error) {
      throw error;
    }
  }

  async getNewUsers() {
    try {
      const allNewUsers = await conn.awaitQuery('select * from users where ?', {
        status: 0,
      });
      return allNewUsers;
    } catch (error) {
      throw error;
    }
  }
  async getNewUserByID(id) {
    try {
      const newUser = await conn.awaitQuery(
        'select * from users where ? and ? ',
        [{ id: id }, { status: 0 }]
      );
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async approveUser(id, limit, res) {
    await conn.awaitQuery(
      'update users set ? where ?',
      [{ status: 1, limited_requests: limit }, { id: id }],
      (err) => {
        if (err) {
          return res.status(500);
        } else {
          return res.status(200);
        }
      }
    );
  }

  async rejectUser(id) {
    try {
      const deleteUser = await conn.awaitQuery('Delete from users where ?', {
        id: id,
      });
      return deleteUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserLimitsByID(id) {
    try {
      const limits = await conn.awaitQuery(
        'select limited_requests from users where ? ',
        {
          id: id,
        }
      );
      return limits[0];
    } catch (error) {
      throw error;
    }
  }

  async updateUserLimits(id, limit) {
    try {
      await conn.awaitQuery('update users set ? where ? ', [
        { limited_requests: limit },
        {
          id: id,
        },
      ]);
    } catch (error) {
      throw error;
    }
  }

  /* async getBookStatus(ISBN) {
    try {
      const status = await conn.awaitQuery(
        'select isBorrowed from books where ?',
        { ISBN: ISBN }
      );
      return status;
    } catch (error) {
      throw error;
    }
  } */
  //Override
  async addNewBook(data, imgName, res) {
    imgName = imgName.replaceAll('\\', '/');
    try {
      conn.query('insert into books set ?', {
        ISBN: data.ISBN,
        title: data.title,
        author: data.author,
        subject: data.subject,
        rackNumber: data.rackNumber,
        description: data.description,
        img_url: imgName,
      });
      res.json({ status: 201, messege: 'created succsessfully' });
    } catch (error) {
      res.status(204).json({ messege: 'failed to save the book' });
      throw error;
    }
  }
  // Override
  async updateBookStatus(ISBN) {
    try {
      await conn.awaitQuery('update books set ? where ?', [
        { isBorrowed: 1 },
        { ISBN: ISBN },
      ]);
    } catch (error) {
      throw error;
    }
  }
  // Override
  async updateBorrowedRequest(ISBN, id, startDate, endDate) {
    await conn.awaitQuery(
      'update borrowed set ? where ? and ?',
      [
        { startDate: startDate, endDate: endDate, is_Borrowed: 1 },
        { user_id: id },
        { book_ISBN: ISBN },
      ],
      (err) => {
        if (err) {
          return res.status(500);
        } else {
          return res.status(200);
        }
      }
    );
  }
  // Override
  async approveBorrowedRequest(id, ISBN, startDate, endDate, res) {
    try {
      const status = await this.getBookStatus(ISBN);
      if (!status[0].isBorrowed) {
        await this.updateBookStatus(ISBN);
        await this.updateBorrowedRequest(ISBN, id, startDate, endDate);
      } else {
        res.status(405);
      }
    } catch (error) {
      throw error;
    }
  }
  // Override
  async deleteBookByISBN(ISBN) {
    try {
      const deletedBook = await conn.awaitQuery('Delete from books where ?', {
        ISBN: ISBN,
      });
      return deletedBook;
    } catch (error) {
      throw error;
    }
  }
  // Override
  async updateBook(book, res) {
    const updatedBook = await conn.awaitQuery(
      'update books set ? where ?',
      [
        {
          title: book.title,
          author: book.author,
          subject: book.subject,
          rackNumber: book.rackNumber,
          description: book.description,
        },
        {
          ISBN: book.ISBN,
        },
      ],
      (err) => {
        if (err) {
          res.status(204);
        } else {
          res.status(200);
        }
      }
    );
    return updatedBook;
  }
  // Override
  async getAllBorrowedRequest() {
    const allRequests = await conn.awaitQuery(
      'select * from borrowed join books on books.ISBN = borrowed.book_ISBN join users on borrowed.user_id = users.id where books.isBorrowed = 0'
    );
    return allRequests;
  }
  // Override
  async rejectBorrowedRequest(id, ISBN) {
    try {
      const deleteRequest = await conn.awaitQuery(
        'Delete from borrowed where ? and ?',
        [
          {
            user_id: id,
          },
          { book_ISBN: ISBN },
        ]
      );
      return deleteRequest;
    } catch (error) {
      throw error;
    }
  }
  // Override
  async updateStatusInHistory(id, ISBN, status) {
    await conn.awaitQuery('update history set ? where ? and ? and ?', [
      { status: status },
      { user_id: id },
      { book_ISBN: ISBN },
      { status: 'pending' },
    ]);
  }
  // Override
  async updateDateInHistory(id, ISBN, startDate, endDate) {
    await conn.awaitQuery('update history set ? where ? and ? and ?', [
      { book_startDate: startDate, book_endDate: endDate },
      { user_id: id },
      { book_ISBN: ISBN },
      { status: 'pending' },
    ]);
  }
}
module.exports = Admin;
