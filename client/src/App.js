import Login from "../src/components/Pages/Login.js";
import Signup from "../src/components/Pages/Signup.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/components/Pages/Home.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from "../src/components/Pages/Services.js";
import Books from "../src/components/Pages/Books.js";
import Contact from "../src/components/Pages/Contact.js";
import Borrowed from "./components/Pages/Borrowed.js";
import BorrowedHistory from "./components/Pages/BorrowedHistory.js";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
