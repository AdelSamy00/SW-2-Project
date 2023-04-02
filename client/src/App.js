import Login from '../src/shared/Pages/Login.js';
import Signup from '../src/shared/Pages/Signup.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/components/Pages/UserPages/Home.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from '../src/components/Pages/UserPages/Services.js';
import Books from '../src/components/Pages/UserPages/Books.js';
import Contact from '../src/components/Pages/UserPages/Contact.js';
import Borrowed from './components/Pages/UserPages/RequestBorrow.js';
import BorrowedHistory from '../src/components/Pages/UserPages/BorrowedHistory.js';
import AddBook from './components/Pages/AdminPages/AddBook.js';
import ManageBooks from './components/Pages/AdminPages/ManageBooks.js';
import AcceptUser from './components/Pages/AdminPages/AcceptUser.js';
import ManageBorrowedReq from './components/Pages/AdminPages/ManageBorrowReq.js';
import UpdateBook from './components/Pages/AdminPages/UpdateBook.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/borrow/request" element={<Borrowed />}></Route>
        <Route path="/borrowed/history" element={<BorrowedHistory />}></Route>
        <Route path="/admin/book/add" element={<AddBook />}></Route>
        <Route path="/admin/book/manage" element={<ManageBooks />}></Route>
        <Route path="/admin/users/accept" element={<AcceptUser />}></Route>
        <Route
          path="/admin/borrowed/request"
          element={<ManageBorrowedReq />}
        ></Route>
        <Route path="/admin/book/update/:ISBN" element={<UpdateBook />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
