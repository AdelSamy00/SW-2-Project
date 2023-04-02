import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AdminHeader from '../../../shared/Pages/AdminHeader.js';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const navigate = useNavigate();
  const ISBN = useParams();
  //console.log(ISBN);
  const [values, setValues] = useState({
    ISBN: '',
    title: '',
    author: '',
    subject: '',
    rackNumber: '',
    description: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:4000/admin/update-book/${ISBN.ISBN}`,
      values
    );
    console.log(res.status);
    if (res.status == 200) {
      alert('Update Successfuly.');
      navigate('/admin/book/manage');
    } else {
      alert('Something Wrong.');
    }
    console.log(res);
  };
  useEffect(() => {
    const getAllDetails = async (ISBN) => {
      const res = await axios.get(
        `http://localhost:4000/book/book-by-ISBN/${ISBN}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      //console.log(res);
      if (res.data.message == 'found') {
        console.log('data get');
        //console.log(res.data.data);
        //console.log(res);
        const { ISBN, title, author, subject, rackNumber, description } =
          res.data.data[0];
        //console.log(ISBN);
        setValues({
          ISBN: ISBN,
          title: title,
          author: author,
          subject: subject,
          rackNumber: rackNumber,
          description: description,
        });
      } else {
        console.log('error');
      }
    };
    getAllDetails(ISBN.ISBN);
  }, []);
  console.log(values);
  return (
    <>
      <AdminHeader />
      <div className="container mt-3">
        <h1>Upload Book</h1>
        {
          <Form>
            <Form.Group className="mb-3" controlId="formBasicISBN">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="namber"
                name="ISBN"
                //onChange={handleInput}
                required
                value={values.ISBN}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAutorName">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                onChange={(e) => {
                  setValues({ ...values, author: e.target.value });
                }}
                value={values.author}
                required="true"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={(e) => {
                  setValues({ ...values, title: e.target.value });
                }}
                value={values.title}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRackNumber">
              <Form.Label>Rack Number</Form.Label>
              <Form.Control
                type="text"
                name="rackNumber"
                onChange={(e) => {
                  setValues({ ...values, rackNumber: e.target.value });
                }}
                value={values.rackNumber}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                onChange={(e) => {
                  setValues({ ...values, subject: e.target.value });
                }}
                value={values.subject}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={(e) => {
                  setValues({ ...values, description: e.target.value });
                }}
                value={values.description}
                required
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicFile">
              <Form.Label>Select Your Image</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={setfile}
                required
              />
            </Form.Group> */}
            <Button
              variant="primary"
              type="submit"
              className="mb-5"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Form>
        }
      </div>
    </>
  );
};

export default UpdateBook;
