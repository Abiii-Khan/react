/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../firebase.js";
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
  const logout = () => {
    alert("You are logged out successfully!");
  };

  return (
    <>
      <Form.Group className="container-fluid overflow-hidden fixed-sticky bg-secondary">
        <div style={{ margin: "auto", textAlign: "end", position:"0px 0px 0px 0px" }}>
          <h3
            style={{
              textAlign: "left",
              fontFamily: "fantasy",
              padding: "2%",
              color: "white",
              textTransform: "capitalize"
            }}
          >
            {console.log(user)}
            {user.username}
          </h3>
          <Link to="/Login" className="logout" onClick={logout}>
            Logout
          </Link>
        </div>
      </Form.Group>
      <Form.Group className="container-fluid bg-secondary p-2">
        <Form.Control
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
      <Form.Group className="container-fluid mt-10% list-group">
        {foundUsers && foundUsers.length > 0 ? (
          foundUsers.map((user) => (
            <a
              className="list-group-item list-group-item-action list-group-item-light m-1"
              href="http://localhost:3000/messages"
              key={JSON.stringify(user)}
              state={JSON.stringify(user)}
            >
              <PersonCircle className="m-2" color="grey" size={40} />
              {user.username}
            </a>
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
    </>
  );
};

export default Profile;