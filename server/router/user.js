const router = require('express').Router();
const Book = require('../repository/Book');
const User = require('../repository/User');

const UserServices = require('../services/userServices');

const user = new User();
const book = new Book();
// depandency injection ---- constructor
const services = new UserServices(user, book);

router.post('/signup', async function (req, res) {
  const data = req.body;
  const result = await services.getUserByEmail(data.email);
  if (result.length > 0) {
    res.status(210).send('this Email address is already reqistered.');
  } else {
    await services.createUser(req, res);
    res.status(201).json({ message: 'signup sccessfully' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userData = await services.userLogin(email, password);
  if (userData.length == 0) {
    res.status(404).json({ message: 'please check you email or pasword.' });
  } else if (userData[0].status != 1) {
    res.status(405).json({
      message: 'You cannot login new please wait until your approval.',
    });
  } else {
    res
      .status(200)
      .json({ message: 'login Successfully.', userData: userData[0] });
  }
});

// checkIfBowrrowed  ----- getBookStatus
router.post('/add-book-request/:id&:ISBN', async function (req, res) {
  const { id, ISBN } = req.params;
  try {
    const status = await services.getBookStatus(ISBN);
    if (status[0].isBorrowed) {
      res
        .status(401)
        .json({ message: 'the book is already Borrowed by another user.' });
    } else {
      await services.getRequestToBorrow(id, ISBN, res);
    }
  } catch (error) {
    throw error;
  }
});

router.get('/get-book/:ISBN', async (req, res) => {
  const { ISBN } = req.params;
  try {
    const bookDetails = await services.getBookByISBN(ISBN);
    res.status(200).json({ message: 'Get data', data: bookDetails });
  } catch (error) {
    res.status(404).json({ message: error.message });
    throw error;
  }
});

router.get('/history/:userID', async function (req, res) {
  const { userID } = req.params;
  try {
    const userHistory = await services.getHistory(userID);
    res.status(200).json({ message: 'user history', data: userHistory });
  } catch (error) {
    res.status(404).json({ message: error.message });
    throw error;
  }
});

router.get('/currentApproval/:userID', async function (req, res) {
  const { userID } = req.params;
  try {
    const aprovalRequests = await services.getAprovalRequests(userID);
    res.status(200).json({ message: 'user history', data: aprovalRequests });
  } catch (error) {
    res.status(404).json({ message: error.message });
    throw error;
  }
});

router.put(
  '/returnBook/:id&:ISBN&:limits&:startDate&:endDate',
  async (req, res) => {
    try {
      let { id, ISBN, limits, startDate, endDate } = req.params;
      await services.returnBook(id, ISBN, startDate, endDate, res);
      limits = parseInt(limits) + 1;
      await services.updateUserLimits(id, limits);
      if (res.status === 200) {
        res.status(200).json({ message: 'returned successfully' });
      } else {
        res.status(404).json({ message: 'error' });
      }
    } catch (error) {
      throw error;
    }
  }
);

module.exports = router;
