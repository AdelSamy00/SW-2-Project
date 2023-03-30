import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/Pages/Header.js";

const AddBook = () => {
  return (
    <>
      <Header />
      <div>AddBook</div>
      <div className="container mt-3">
        <h1>Upload Your Img Here</h1>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" name="fname" /* onChange={setdata}  */ />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control
              type="file"
              name="photo" /*  onChange={setimgfile} */
            />
          </Form.Group>
          <Button variant="primary" type="submit" /*  onClick={addUserData} */>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
