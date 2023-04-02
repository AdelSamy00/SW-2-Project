import React, { useEffect, useState } from 'react';
import AdminHeader from '../../../shared/Pages/AdminHeader.js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const ManageBooks = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const getAllBooks = async () => {
    const res = await axios.get('http://localhost:4000/book', {
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
  const deleteBook = async (ISBN) => {
    console.log(ISBN);
    const res = await axios.delete(
      `http://localhost:4000/admin/delete-book/${ISBN}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(res);
    if (res.status == 202) {
      getAllBooks();
      setShow(true);
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
      {show ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          Book Delete
        </Alert>
      ) : (
        ''
      )}
      <AdminHeader />
      <div className="container mt-2">
        <h1 className="text-center mt-2">Manage Books</h1>
        <div className="text-end">
          <Button variant="primary">
            <NavLink
              to="/admin/book/add"
              className="text-decoration-none text-light"
            >
              Add Book
            </NavLink>
          </Button>
        </div>
        <div className="d-flex justify-content-between align-content-start flex-wrap m-3">
          {data.length > 0
            ? data.map((el, i) => {
                //console.log(url);
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
                        <div className="d-flex justify-content-around text-center">
                          <Link to={`/admin/book/update/${el.ISBN}`}>
                            <Button
                              variant="secondary"
                              size="lg" /*  onClick={() => dltUser(el.id)} */
                            >
                              Update
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="lg"
                            onClick={() => deleteBook(el.ISBN)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </>
                );
              })
            : ''}
        </div>
      </div>
    </>
  );
};

export default ManageBooks;
