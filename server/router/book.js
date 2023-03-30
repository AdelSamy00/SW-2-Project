const router = require('express').Router();
const conn = require('../config/connection');
const adminAuth = require('../middlewares/admin');
const auther = require('../middlewares/auther');
const Book = require('../model/Book');
const multer = require('multer');

const book = new Book();
//img storage confing
let imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});
//img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(null, Error('only image is allowed'));
  }
};

let upload = multer({
  storage: imgConfig,
  fileFilter: isImage,
});

router.get('/', async function (req, res) {
  const books = await book.getAllBooks();
  //console.log(books);
  if (books.length == 0) {
    res.status(404).json({ message: 'Not found any books!' });
  } else {
    res
      .status(200)
      .json({ message: 'Get all books successfully.', data: books });
  }
});

router.post('/add-new-book', upload.single('photo'), async function (req, res) {
  //console.log(req.body.ISBN);
  /*   try {
    const bookData = req.body;
    const imgName = req.file.path;
    console.log(imgName);
    await book.addNewBook(bookData, imgName, res);
  } catch (error) {
    console.log(error);
    throw error;
  } */
});

router.get('/book-by-ISBN', async (req, res) => {
  try {
    const { ISBN } = req.body;
    console.log(ISBN);
    const bookData = await book.getBookByISBN(ISBN);
    if (bookData.length > 0) {
      res.status(200).json({ message: 'found', data: bookData });
    } else {
      res.status(404).json({ message: 'book is not found.' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
