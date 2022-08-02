/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {Button, Form, Row, Col} from "react-bootstrap";
import { PersonCircle, PersonSquare } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import {db} from "../firebase.js"
import { ref, onValue, push, update, remove } from "firebase/database";

const Profile = () => {
  const userDetails = { username: "", email: "", password: "" };
  const [values, setValues] = useState(userDetails);
  const [username, setUserName] = useState("");
  const [all, setAll] = useState([]);
  const [na, setNa] = useState("");
  const [foundUsers, setFoundUsers] = useState(all);

  useEffect(() => {
    const value = localStorage.getItem("Name")
    const items = JSON.parse(value);
    if (items) {
      setUserName(items)
      Data()
    }
  }, []);

  const Data=()=>{
    var item = [];
    return onValue(ref(db, "/users"), querySnapShot => {
      querySnapShot.forEach((snap)=>{
        item.push(snap.val())
      })
      setAll(item)
    });
  }
  
  const filter = (e) => {
    e.preventDefault();
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = all.filter((user) => {
        return user.username.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(keyword)
    }
  };
  console.log(all);
  return (
    <>
      <Form.Group className="container-fluid bg-secondary ">
        <h3 style={{ textAlign: "left", fontFamily:"fantasy", padding:"2%", color:"white"}}>{username}</h3>
      </Form.Group>
      <Form.Group className="container-fluid bg-secondary p-2">
        <Form.Control className="container" type="search" placeholder="Search..." onChange={filter} ></Form.Control>
        <div className="user-list">
          {foundUsers && foundUsers !== "" ? (
            foundUsers.map((user) => (
              <Form.Group className="container mt-5px list-group" key={user.email}>
                <a className="nav-link list-group-item list-group-item-action list-group-item-light " href="#user">
                  {user.username}
                </a>
              </Form.Group>
            ))
          ) : (
            <></>
          )} 
        </div>  
      </Form.Group><br/>
      <Form.Group className="container-fluid mt-10% list-group">
        {/* {foundUsers && foundUsers === ""  ? (
          foundUsers.map((user) => (
            <a className="list-group-item list-group-item-action list-group-item-light m-1" href="http://localhost:3000/Messages" key={user.username}>
              <PersonCircle className="m-2" color="grey" size={40} />{user.username}
            </a> 
          ))
        ) : (
          <></>
        )} */}

        {all && all.length > 0 ? (
          all.map((user) => (
            <a className="list-group-item list-group-item-action list-group-item-light m-1" id="user" href="http://localhost:3000/Messages" key={user.username}>
              <PersonCircle className="m-2" color="grey" size={40} />{user.username}
            </a> 
          ))
        ) : (
          <></>
        )} 
        
      </Form.Group>
    </>
  );
};

export default Profile;
