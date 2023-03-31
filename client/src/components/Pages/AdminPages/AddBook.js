import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AdminHeader from "../../../shared/Pages/AdminHeader.js";
import Header from "../../../shared/Pages/Header.js";

const AddBook = () => {
  return (
    <>
      <AdminHeader />
      <div className="container mt-3">
        <h1>Upload Book</h1>
              <Form>
                  
          <Form.Group className="mb-3" controlId="formBasicAutorName">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" /* onChange={setdata}  */ />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" /* onChange={setdata}  */ />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicISBN">
            <Form.Label>ISBN</Form.Label>
            <Form.Control type="namber" name="ISBN" /* onChange={setdata}  */ />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRackNumber">
            <Form.Label>Rack Number</Form.Label>
            <Form.Control
              type="text"
              name="rackNumber" /* onChange={setdata}  */
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject" /* onChange={setdata}  */
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description" /* onChange={setdata}  */
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control
              type="file"
              name="photo" /*  onChange={setimgfile} */
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mb-5" /*  onClick={addUserData} */
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
