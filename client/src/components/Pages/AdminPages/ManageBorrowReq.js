import React from "react";
import AdminHeader from "../../../shared/Pages/AdminHeader.js";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ManageBorrowedReq = () => {
  return (
    <>
      <AdminHeader />
      <div className="container mt-2">
        <h1 className="text-center mt-2 mb-5">Manage Borrowed Requests</h1>
        <div className="d-flex justify-content-between align-content-start flex-wrap m-3 ">
          {/* {data.length > 0
            ? data.map((el, i) => {
                return (
                  <> */}
          <Card style={{ width: "22rem", height: "28rem" }} className="mb-3">
            <div className="d-flex justify-content-around text-center">
              <Card.Img
                variant="top"
                src={
                  "https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
                }
                /* src={`/uploads/${el.userimg}`} */
                style={{
                  width: "100px",
                  textAlign: "center",
                  margin: "auto",
                }}
                className="mt-2"
              />
              <Card.Img
                variant="top"
                src={
                  "https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
                }
                /* src={`/uploads/${el.userimg}`} */
                style={{
                  width: "100px",
                  textAlign: "center",
                  margin: "auto",
                }}
                className="mt-2"
              />
            </div>
            <Card.Body /* className="text-center" */>
              <Card.Title>User Name :{/*  {el.username} */}</Card.Title>
              <Card.Text>
                User Email :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Card.Text>
                Book Title :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <Card.Text>
                Book ISPN :{/*  {moment(el.date).format("DD-MM-YYYY")} */}
              </Card.Text>
              <div className="d-flex justify-content-between text-center mb-3">
                <label for="html5-date-input" className="col-form-label">
                  Return Date :
                </label>
                <div className="col-md-8">
                  <input
                    className="form-control"
                    type="date"
                    id="html5-date-input"
                  ></input>
                </div>
              </div>

              <div className="d-flex justify-content-around text-center">
                <Button
                  variant="success"
                  size="lg"
                  /*  onClick={() => dltUser(el.id)} */
                >
                  Accept
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  /*  onClick={() => dltUser(el.id)} */
                >
                  Reject
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

export default ManageBorrowedReq;
