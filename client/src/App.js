import Login from "../src/shared/Pages/Login.js";
import Signup from "../src/shared/Pages/Signup.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/components/Pages/UserPages/Home.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from "../src/components/Pages/UserPages/Services.js";
import Books from "../src/components/Pages/UserPages/Books.js";
import Contact from "../src/components/Pages/UserPages/Contact.js";
import Borrowed from "../src/components/Pages/UserPages/Borrowed.js";
import BorrowedHistory from "../src/components/Pages/UserPages/BorrowedHistory.js";
import AddBook from "./components/Pages/AdminPages/AddBook.js";
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
        <Route path="/borrowed" element={<Borrowed />}></Route>
        <Route path="/borrowedHistory" element={<BorrowedHistory />}></Route>
        <Route path="/addBook" element={<AddBook />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
