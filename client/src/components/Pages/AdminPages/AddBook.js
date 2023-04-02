import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AdminHeader from '../../../shared/Pages/AdminHeader.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddBook = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ISBN: '',
    title: '',
    author: '',
    subject: '',
    rackNumber: '',
  });
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
    console.log(event.target);
  };
  const [file, setFile] = useState('');
  const setfile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('photo', file);
    formData.append('ISBN', values.ISBN);
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('subject', values.subject);
    formData.append('description', values.description);
    formData.append('rackNumber', values.rackNumber);
    console.log(formData);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await axios.post(
      'http://localhost:4000/book/add-new-book',
      formData,
      config
    );
    console.log(res.status);
    if (res.status == 200) {
      alert('Added Successfuly.');
      navigate('/admin/book/manage');
    } else {
      alert('Something Wrong.');
    }
    console.log(res);
  };

  return (
    <>
      <AdminHeader />
      <div className="container mt-3">
        <h1>Upload Book</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicAutorName">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" onChange={handleInput} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" onChange={handleInput} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicISBN">
            <Form.Label>ISBN</Form.Label>
            <Form.Control type="namber" name="ISBN" onChange={handleInput} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRackNumber">
            <Form.Label>Rack Number</Form.Label>
            <Form.Control
              type="text"
              name="rackNumber"
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" name="subject" onChange={handleInput} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file" name="photo" onChange={setfile} />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mb-5"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
