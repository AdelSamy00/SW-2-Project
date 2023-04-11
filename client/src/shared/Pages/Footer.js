import "../style/Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h3 className="font-italic font-weight-bold">LIBRARY</h3>
        <p>
          Raj Template is a blog website where you will find great tutorials on
          web design and development. Here each tutorial is beautifully
          described step by step with the required source code.
        </p>
      </div>
      <div className="footer-bottom">
        <div className="footer-menu">
          <ul className="f-menu">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/borrow/request">Request Borrow</Link>
            </li>
            <li>
              <Link to="/borrowed/history">Borrowed History</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
