
import React from "react";
import AdminHeader from "../../../shared/Pages/AdminHeader.js";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";

const ManageBooks = () => {
  return (
    <>
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
              <div className="d-flex justify-content-around text-center">
                <Button
                  variant="secondary"
                  size="lg" /*  onClick={() => dltUser(el.id)} */
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  /*  onClick={() => dltUser(el.id)} */
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
          {/*</> 
                );
              })
            : ""} */}
        </div>
      </div>
    </>
  );
};

export default ManageBooks;
