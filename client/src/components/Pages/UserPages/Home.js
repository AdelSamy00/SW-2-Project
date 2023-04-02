import React, { useEffect } from 'react';
import Footer from '../../../shared/Pages/Footer.js';
import Header from '../../../shared/Pages/Header.js';
import '../../Style/Home.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <Header />
      {/* Availble Books Part */}
      <div className="container mt-2">
        <h1 className="text-center mt-2">Available Books</h1>
        <div className="d-flex justify-content-between align-content-start flex-wrap m-3">
          {/* {data.length > 0
            ? data.map((el, i) => {
                return (
                  <> */}
          <Card style={{ width: '33rem', height: '45rem' }} className="mb-3">
            <Card.Img
              variant="top"
              src={
                'https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80'
              }
              /* src={`/uploads/${el.userimg}`} */
              style={{
                width: '150px',
                textAlign: 'center',
                margin: 'auto',
              }}
              className="mt-2"
            />
            <Card.Body /* className="text-center" */>
              <Card.Title>Title :{/*  {el.username} */}</Card.Title>
              <Card.Text>
                Author :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Card.Text>
                ISPN :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Card.Text>
                Subject :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Card.Text>
                Description :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Card.Text>
                Rack Number :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Link
                to="/borrow/request"
                className="position-absolute bottom-0 start-50 translate-middle-x mb-3"
              >
                <Button
                  variant="btn btn-success"
                  size="lg"
                  /*  onClick={() => dltUser(el.id)} */
                >
                  Want to Borrow
                </Button>
              </Link>
            </Card.Body>
          </Card>
          {/*</> 
                );
              })
            : ""} */}
        </div>
      </div>
      <div className="moreButton mb-3">
        <Link to="/books">
          <Button variant="info" size="lg">
            More Books
          </Button>
        </Link>
      </div>

      {/* Services part */}
      <Carousel fade>
        <Carousel.Item>
          <img
            style={{ width: '100%', height: '37rem' }}
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: '100%', height: '37rem' }}
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: '100%', height: '37rem' }}
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* Borrowed History part */}
      <div className="container mt-2">
        <h1 className="text-center mt-2">Borrowed History</h1>
        <div className="d-flex justify-content-between align-content-start flex-wrap m-3">
          {/* {data.length > 0
            ? data.map((el, i) => {
                return (
                  <> */}
          <Card style={{ width: '33rem', height: '30em' }} className="mb-3">
            <Card.Img
              variant="top"
              src={
                'https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80'
              }
              /* src={`/uploads/${el.userimg}`} */
              style={{
                width: '150px',
                textAlign: 'center',
                margin: 'auto',
              }}
              className="mt-2"
            />
            <Card.Body /* className="text-center" */>
              <Card.Title>Title :{/*  {el.username} */}</Card.Title>
              <Card.Text>
                Author :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Card.Text>
                ISPN :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Card.Text>
                Subject :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Card.Text>
                Borrow Date :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Card.Text>
                Return Date :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
            </Card.Body>
          </Card>
          {/*</> 
                );
              })
            : ""} */}
        </div>
      </div>
      <div className="moreButton mb-3">
        <Link to="/borrowed/history">
          <Button variant="info" size="lg">
            More Of Borrowed History
          </Button>
        </Link>
      </div>
      {/* contact us part */}
      <div id="contact" className="contact-area section-padding">
        <div className="container">
          <div className="section-title text-center">
            <h1>Get in Touch</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              vitae risus nec dui venenatis dignissim. Aenean vitae metus in
              augue pretium ultrices.
            </p>
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
                    <Form.Control type="text" placeholder="Subject" />
                  </Form.Group>
                  <Form.Group className="mb-3 " controlId="formBasicPassword">
                    <InputGroup>
                      <Form.Control as="textarea" placeholder="Your Message" />
                    </InputGroup>
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

export default Home;
