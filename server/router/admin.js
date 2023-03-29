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
    console.log(allUsers[0]);
    res
      .status(200)
      .json({ message: 'get all users successfully.', allData: allUsers });
  }
});

router.put('/get-new-users', async (req, res) => {
  const { userID, reqLimit } = req.body;
  console.log(reqLimit);
  admin.approveUser(userID, reqLimit, res);
  if (res.status === 500) {
    res.json({ message: 'samething Wrong.' });
  } else {
    res.json({ massage: 'Approveal completed ' });
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

module.exports = router;
