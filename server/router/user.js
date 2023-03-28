const router = require('express').Router();
const conn = require('../config/connection');
const express = require('express');
const User = require('../model/User');

const user = new User();
router.post('/signup', async function (req, res) {
  const data = req.body;
  const result = await user.getUserByEmail(data.email);
  if (result.length > 0) {
    res.status(210).send('this Email address is already reqistered.');
  } else {
    await user.createUser(req, res);
    res.status(201);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await user.userLogin(email, password);
  //console.log(result);
  if (result.length == 0) {
    res.status(404).json('please check you email or pasword.');
  } else {
    res
      .status(200)
      .json({ massage: 'login Successfully.', userData: result[0] });
    //const userId = JSON.parse(JSON.stringify(result))[0].id;
    //console.log(res.setHeader('userid', userId));
  }
});

router.post('/add-book-request/:ISBN&:id', async function (req, res) {
  const { ISBN, id } = req.params;
  try {
    const result = await user.checkIfBorrowed(id, ISBN);
    if (result.length > 0) {
      res.status(401).json({ message: 'this request has already send.' });
    } else {
      await user.getRequestToBorrow(id, ISBN);
      res.status(200).json({ message: 'Request send.' });
    }
  } catch (error) {
    throw error;
  }
});

router.get('/history/:id', async function (req, res) {
  const { id } = req.params;
  try {
    const result = await user.getHistory(id);
    res.status(200).json({ message: 'user history', data: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
    throw error;
  }
});

module.exports = router;
