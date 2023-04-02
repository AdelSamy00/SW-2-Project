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

router.get('/get-new-users', async (req, res) => {
  const allUsers = await admin.getNewUsers();
  if (allUsers.length == 0) {
    res.status(404).json({
      message: 'ther are no new users waiting for approval.',
    });
  } else {
    //console.log(allUsers[0]);
    res
      .status(200)
      .json({ message: 'get all users successfully.', allData: allUsers });
  }
});

router.put('/get-new-users/:userID&:reqLimit', async (req, res) => {
  const { userID, reqLimit } = req.params;
  console.log(userID, reqLimit);
  admin.approveUser(userID, reqLimit, res);
  if (res.status === 500) {
    res.json({ message: 'samething Wrong.' });
  } else {
    res.json({ message: 'Approveal completed ' });
  }
});

router.put('/all-borrowed-requests', async (req, res) => {
  const { id, ISBN, startDate, endDate } = req.body;
  await admin.approveBorrowedRequest(id, ISBN, startDate, endDate, res);
  if (res.status === 500) {
    res.json({ message: 'samething Wrong.' });
  } else {
    await admin.setStatusOfBookRequest(ISBN);
    res.json({ massage: 'Approveal completed ' });
  }
});
router.delete('/delete-book/:ISBN', async (req, res) => {
  const { ISBN } = req.params;
  //console.log(ISBN);
  const result = await admin.deleteBookByISBN(ISBN);
  if (result.affectedRows == 1) {
    res.status(202).json({ message: 'delete successfuly', data: result });
  } else {
    res.status(400).json({ message: 'bad request' });
  }
});

router.put('/update-book/:ISBN', async (req, res) => {
  try {
    const { ISBN } = req.params;
    const data = req.body;
    //const book = await admin.getBookByISBN(ISBN);
    const result = await admin.updateBook(ISBN, data, res);
    console.log(result);
    if (result.affectedRows == 1) {
      res.json({ message: 'update successfuly', data: result });
    } else {
      res.json({ message: 'bad request' });
    }
  } catch (error) {
    throw error;
  }
});

router.delete('/reject-user/:id', async (req, res) => {
  const { id } = req.params;
  const result = await admin.rejectUser(id);
  if (result.affectedRows == 1) {
    res.status(202).json({ message: 'delete successfuly', data: result });
  } else {
    res.status(400).json({ message: 'bad request' });
  }
});

module.exports = router;
