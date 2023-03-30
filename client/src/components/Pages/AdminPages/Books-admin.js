import "../Style/Books.css";
import React from "react";
import Footer from "../../shared/Pages/Footer";
import Header from "../../shared/Pages/Header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";



const Books = () => {
  return (
    <>
      <Header />
      <div>Books page</div>
      <div className="container mt-2">
        <h1 className="text-center mt-2">
          Image Upload Projects With Mysql database
        </h1>

        <div className="text-end">
          <Button variant="primary">
            <NavLink to="/register" className="text-decoration-none text-light">
              Add User
            </NavLink>
          </Button>
        </div>

        <div className="d-flex justify-content-between align-content-start flex-wrap m-3">
          {/* {data.length > 0
            ? data.map((el, i) => {
                return (
                  <> */}
          <Card style={{ width: "22rem", height: "18rem" }} className="mb-3">
            <Card.Img
              variant="top"
              /* src={`/uploads/${el.userimg}`} */
              style={{
                width: "100px",
                textAlign: "center",
                margin: "auto",
              }}
              className="mt-2"
            />
            <Card.Body className="text-center">
              <Card.Title>UserName :{/*  {el.username} */}</Card.Title>
              <Card.Text>
                Date Added :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Button
                variant="danger"
                /*  onClick={() => dltUser(el.id)} */
                className="col-lg-6 text-center"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "22rem", height: "18rem" }} className="mb-3">
            <Card.Img
              variant="top"
              /* src={`/uploads/${el.userimg}`} */
              style={{
                width: "100px",
                textAlign: "center",
                margin: "auto",
              }}
              className="mt-2"
            />
            <Card.Body className="text-center">
              <Card.Title>UserName :{/*  {el.username} */}</Card.Title>
              <Card.Text>
                Date Added :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Button
                variant="danger"
                /*  onClick={() => dltUser(el.id)} */
                className="col-lg-6 text-center"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "22rem", height: "18rem" }} className="mb-3">
            <Card.Img
              variant="top"
              /* src={`/uploads/${el.userimg}`} */
              style={{
                width: "100px",
                textAlign: "center",
                margin: "auto",
              }}
              className="mt-2"
            />
            <Card.Body className="text-center">
              <Card.Title>UserName :{/*  {el.username} */}</Card.Title>
              <Card.Text>
                Date Added :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Button
                variant="danger"
                /*  onClick={() => dltUser(el.id)} */
                className="col-lg-6 text-center"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "22rem", height: "18rem" }} className="mb-3">
            <Card.Img
              variant="top"
              /* src={`/uploads/${el.userimg}`} */
              style={{
                width: "100px",
                textAlign: "center",
                margin: "auto",
              }}
              className="mt-2"
            />
            <Card.Body className="text-center">
              <Card.Title>UserName :{/*  {el.username} */}</Card.Title>
              <Card.Text>
                Date Added :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Button
                variant="danger"
                /*  onClick={() => dltUser(el.id)} */
                className="col-lg-6 text-center"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
          {/*</> 
                );
              })
            : ""} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Books;
