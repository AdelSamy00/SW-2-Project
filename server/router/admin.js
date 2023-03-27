const router = require('express').Router();
const conn = require('../config/connection');
const express = require('express');
const Admin = require('../model/Admin');

const admin = new Admin();
router.get('/get-all-users', async function (req, res) {
  const result = await admin.getAllUsers();
  //console.log(result);
  if (result.length == 0) {
    res.status(404).json('there not found any users.');
  } else {
    res.status(200).json(result);
  }
});

/* router.post('/', async function (req, res) {
  try {
    const bookData = req.body;
    await admin.addNewBook(bookData, res);
  } catch (error) {
    console.log(error);
    throw error;
  }
}); */

router.get('/get-new-users', async (req, res) => {
  const allUsers = await admin.getNewUsers();
  if (allUsers.length == 0) {
    res.status(404).json({
      message: 'ther are no were any new users.',
    });
  } else {
    console.log(allUsers[0]);
    res
      .status(200)
      .json({ message: 'get all users successfully.', allData: allUsers });
  }
});

router.put('/get-new-users/:id', (req, res) => {
  const { id } = req.params;
  admin.approveUser(req, res, id);
});

router.put(
  '/all-borrowed-requests/:id&:ISBN&:startDate&:endDate',
  (req, res) => {
    const { id, ISBN, startDate, endDate } = req.params;
    conn.query(
      'update borrowed set ? where ? and ?',
      [
        { startDate: startDate, endDate: endDate, isBorrowed: 1 },
        { user_id: id },
        { book_ISBN: ISBN },
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.statusCode = 400;
          res.json({ massage: 'samething Wrong.' });
        } else {
          res.json({ massage: 'request accepted.' });
        }
      }
    );
  }
);

module.exports = router;
