import { Link } from 'react-router-dom';
import '../style/Header.css';
import Button from 'react-bootstrap/Button';
const Header = () => {
  return (
    <>
      <div className="navigation-wrap bg-light start-header start-style">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-md navbar-light">
                <Link
                  to="/home"
                  className="navbar-brand font-italic font-weight-bold"
                >
                  LIBRARY
                </Link>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto py-4 py-md-0">
                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                      <Link to="/home" className="nav-link">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                      <Link to="/books" className="nav-link">
                        Books
                      </Link>
                    </li>
                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                      <Link to="/services" className="nav-link">
                        Services
                      </Link>
                    </li>
                    {/* <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                      <Link to="/borrow/request" className="nav-link">
                        Request Borrow
                      </Link>
                    </li> */}
                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                      <Link to="/borrowed/history" className="nav-link">
                        Borrowed History
                      </Link>
                    </li>
                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                      <Link to="/contact" className="nav-link">
                        Contact Us
                      </Link>
                    </li>

                    <li className="pl-4 pl-md-0 ml-0 ml-md-4">
                      <Link to="/" className="nav-link">
                        <Button
                          variant="outline-dark"
                          onClick={() => {
                            console.log(window.localStorage);
                            window.localStorage.clear();
                          }}
                        >
                          Logout
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
