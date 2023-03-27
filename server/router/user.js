const router = require('express').Router();
const conn = require('../config/connection');
const express = require('express');
const User = require('../model/User');

const user = new User();
router.post('/signup', async function (req, res) {
  /* const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.phone,
  ]; */
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

router.get('/add-book-request/:ISBN', function (req, res) {
  const { ISBN } = req.params;
  result = user.getBorrowedBook(req, res, ISBN);
});
router.post('/add-book-request/:ISBN&:id', function (req, res) {
  const { ISBN, id } = req.params;
  conn.query(
    'select * from books where ?',
    { ISBN: ISBN },
    (err, result, fields) => {
      if (err) {
        console.log('err');
      } else {
        const data = JSON.parse(JSON.stringify(result))[0];
        conn.query(
          'insert into borrowed set ?',
          { user_id: id, book_ISBN: data.ISBN, isBorrowed: 0 },
          (err, result) => {
            if (err) {
              res.statusCode = 400;
              res.json({ massage: 'samething Wrong.' });
            } else {
              res.json({
                massage: 'request send and you will wait until approve it.',
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
