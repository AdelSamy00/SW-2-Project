import Footer from "../../../shared/Pages/Footer";
import Header from "../../../shared/Pages/Header";
import "../../Style/Contact.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Borrowed = () => {
  return (
    <>
      <Header />
      <div id="contact" className="contact-area section-padding">
        <div className="container">
          <div className="section-title text-center m-4">
            <h1>Borrow Request</h1>

          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="contact">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Name" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="email" placeholder="Email" />
                  </Form.Group>
                  <Form.Group className="mb-3 " controlId="formBasicPassword">
                    <Form.Control type="number" placeholder="Phone" />
                  </Form.Group>
                  <Form.Group className="mb-3 " controlId="formBasicPassword">
                    <Form.Control type="text" placeholder="Book Title" />
                  </Form.Group>
                  <Form.Group className="mb-3 " controlId="formBasicPassword">
                    <Form.Control type="number" placeholder="Book ISBN" />
                  </Form.Group>
                  
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn btn-contact-bg mb-5"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="single_address">
                <i className="fa fa-map-marker"></i>
                <h4>Our Address</h4>
                <p>3481 Melrose Place, Beverly Hills</p>
              </div>
              <div className="single_address">
                <i className="fa fa-envelope"></i>
                <h4>Send your message</h4>
                <p>Info@example.com</p>
              </div>
              <div className="single_address">
                <i className="fa fa-phone"></i>
                <h4>Call us on</h4>
                <p>(+1) 517 397 7100</p>
              </div>
              <div className="single_address">
                <i className="fa fa-clock-o"></i>
                <h4>Work Time</h4>
                <p>Mon - Fri: 08.00 - 16.00. Sat: 10.00 - 14.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Borrowed;
