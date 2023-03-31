import React from "react";
import Footer from "../../../shared/Pages/Footer.js";
import Header from "../../../shared/Pages/Header.js";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

const Books = () => {
  return (
    <>
      <Header />
      <div className="container mt-2">
        <h1 className="text-center mt-2">Available Books</h1>
        <div className="d-flex justify-content-between align-content-start flex-wrap m-3">
          {/* {data.length > 0
            ? data.map((el, i) => {
                return (
                  <> */}
          <Card style={{ width: "33rem", height: "45rem" }} className="mb-3">
            <Card.Img
              variant="top"
              src={
                "https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
              }
              /* src={`/uploads/${el.userimg}`} */
              style={{
                width: "150px",
                textAlign: "center",
                margin: "auto",
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
              <Link to="/borrow/request" className="nav-link position-absolute bottom-0 start-50 translate-middle-x mb-3">
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
      <Footer />
    </>
  );
};

export default Books;
