import React, { useEffect, useState } from 'react';
import Footer from '../../../shared/Pages/Footer.js';
import Header from '../../../shared/Pages/Header.js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const Books = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const getAllBooks = async () => {
    const res = await axios.get('http://localhost:4000/book/available-Books', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.data.message == 'Get all books successfully.') {
      console.log('data get');
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
    getAllBooks();
  }, []);
  return (
    <>
      <Header />
      <div className="container mt-2">
        <h1 className="text-center mt-2">Available Books</h1>
        <div className="d-flex justify-content-between align-content-start flex-wrap m-3">
          {data.length > 0
            ? data.map((el, i) => {
                return (
                  <>
                    <Card
                      style={{ width: '33rem', height: '45rem' }}
                      className="mb-3"
                    >
                      <Card.Img
                        variant="top"
                        src={`${el.img_url}`}
                        style={{
                          width: '150px',
                          textAlign: 'center',
                          margin: 'auto',
                        }}
                        className="mt-2"
                      />
                      <Card.Body /* className="text-center" */>
                        <Card.Title>Title : {el.title}</Card.Title>
                        <Card.Text>Author :{el.author}</Card.Text>
                        <Card.Text>ISPN :{el.ISBN}</Card.Text>
                        <Card.Text>Subject :{el.subject}</Card.Text>
                        <Card.Text>Description :{el.description}</Card.Text>
                        <Card.Text>Rack Number :{el.rackNumber}</Card.Text>
                        <Link
                          to="/borrow/request/"
                          state={{ ISBN: `${el.ISBN}` }}
                          className="nav-link position-absolute bottom-0 start-50 translate-middle-x mb-3"
                        >
                          <Button variant="btn btn-success" size="lg">
                            Want to Borrow
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </>
                );
              })
            : ''}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Books;
