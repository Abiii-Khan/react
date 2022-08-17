/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../firebase.js";
import { getAuth, signOut } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import "../index.css";
import { useLocation, useHref } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState("");
  const [all, setAll] = useState([]);
  const [foundUsers, setFoundUsers] = useState(all);
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [loading, setLoading] = useState(true);
  let location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem("Name");
    const items = JSON.parse(value);
    if (items) {
      setUser(items);
      Data();
    }
  }, []);

  const Data = () => {
    var item = [];
    return onValue(ref(db, "/Users"), (querySnapShot) => {
      querySnapShot.forEach((snap) => {
        item.push(snap.val().Signup);
      });
      setAll(item);
      setLoading(false);
    });
  };

  const filter = (e) => {
    e.preventDefault();
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = all.filter((user) => {
        return user.username.toLowerCase().startsWith(keyword.toLowerCase());
      });
      if (results.length === 0) {
        setNoRecordFound(true);
      } else {
        setNoRecordFound(false);
      }
      setFoundUsers(results);
    } else {
      setFoundUsers([]);
      setNoRecordFound(false);
    }
  };

  const handleSubmit = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.location.href = "/login"
      }).catch((error) => {
        //
      });
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            logout
          </Button>
        </Modal.Footer>
      </Modal>
      <div id="profile-header">
        <Form.Group className="container-fluid overflow-hidden bg-secondary">
          <div id="profile-head">
            <h3 id="profile-name">
              {user.username}
            </h3>
            <Form.Text type="submit" onClick={handleShow} className="logout">
            Logout
            </Form.Text>
          </div>
        </Form.Group>
        <Form.Group className="container-fluid bg-secondary p-2">
          <Form.Control id="profile-search"
            className="container"
            type="search"
            placeholder="Search..."
            onChange={filter}
          ></Form.Control>
          <div className="user-list">
            {foundUsers && foundUsers !== "" ? (
              foundUsers.map((user) => (
                <Form.Group
                  className="container mt-5px list-group"
                  key={user.email}
                ></Form.Group>
              ))
            ) : (
              <></>
            )}
          </div>
        </Form.Group>
        <br />
      </div>
      <div id="profile-users">
        <Form.Group className="container-fluid mt-10% list-group">
          {foundUsers && foundUsers.length > 0 ? (
            foundUsers.map((user) => (
              <Link
                className="list-group-item list-group-item-action list-group-item-light m-1"
                to={"/messages/" + user.uid}
                key={user.username}
                state={user}
              >
                <PersonCircle className="m-2" color="grey" size={40} />
                {user.username}
              </Link>
            ))
          ) : noRecordFound ? (
            <div className="text-center">No record found!</div>
          ) : (
            <></>
          )}

          {loading ? (
            <div className="spinner-border m-5 text-center" />
          ) : foundUsers &&
          foundUsers.length === 0 &&
          all &&
          all.length > 0 &&
          !noRecordFound ? (
              all.map((user) => (
                <Link
                  to={"/messages/" + user.uid}
                  key={user.username}
                  state={user}
                  className="list-group-item list-group-item-action list-group-item-light m-1"
                  id="user"
                  href="http://localhost:3000/messages"
                >
                  <PersonCircle className="m-2" color="grey" size={40} />
                  {user.username}
                </Link>
              ))
            ) : (
              <></>
            )}
        </Form.Group>
      </div>
    </>
  );
};

export default Profile;