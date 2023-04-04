import React, { useEffect, useState } from 'react';
import Footer from '../../../shared/Pages/Footer.js';
import Header from '../../../shared/Pages/Header.js';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BorrowedHistory = () => {
  const navigate = useNavigate();
  const userID = window.localStorage.getItem('id');
  const [data, setData] = useState([]);

  const getHistory = async () => {
    const res = await axios.get(`http://localhost:4000/history/${userID}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //console.log(userID);
    if (res.data.message == 'user history') {
      console.log('data get');
      console.log(res);
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
    getHistory();
  }, []);
  //console.log(data);
  return (
    <>
      <Header />
      <div className="container mt-2">
        <h1 className="text-center mt-2">Borrowed History</h1>
        <div className="d-flex justify-content-between align-content-start flex-wrap m-3">
          {data.length > 0
            ? data.map((el, i) => {
                console.log(i);
                //a
                return (
                  <>
                    <Card
                      style={{ width: '33rem', height: '34em' }}
                      className="mb-3"
                    >
                      <Card.Img
                        variant="top"
                        src={`${el.img_url}`}
                        style={{
                          width: '100px',
                          textAlign: 'center',
                          margin: 'auto',
                        }}
                        className="mt-2"
                      />
                      <Card.Body className=" lg-3 align-content-start justify-content-start">
                        <Card.Title>Title : {el.book_title}</Card.Title>
                        <Card.Text>Author :{el.author}</Card.Text>
                        <Card.Text>ISBN :{el.book_ISBN}</Card.Text>
                        <Card.Text>Subject :{el.subject}</Card.Text>
                        <Card.Text>Description :{el.description}</Card.Text>
                        <Card.Text>Rack Number :{el.rackNumber}</Card.Text>
                        <Card.Text>Status :{el.status}</Card.Text>
                        <Card.Text>Borrow Date :{el.startDate}</Card.Text>
                        <Card.Text>Return Date :{el.endDate}</Card.Text>
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
export default BorrowedHistory;
