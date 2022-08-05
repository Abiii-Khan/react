/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { SendFill } from "react-bootstrap-icons";
import { Button, Form } from "react-bootstrap";
import {db} from "../firebase.js"
import "bootstrap/dist/css/bootstrap.min.css";

const Messages = () => {
  const params = useParams();
  console.log(params)
  const [content, setContent] = useState();
  const [error, setError] = useState();
  const [user, setUser] = useState();

  // useEffect(() => {
  //   setError(null);
  //   try {
  //     db.ref("users").on("value", snapshot => {
  //       let users = [];
  //       snapshot.forEach((snap) => {
  //         users.push(snap.val());
  //       });
  //       setUser(users);
  //       console.log(user)
  //     });
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // }, []);
  const handleChange = (e) => {
    setContent(e.target.value)
  }

  useEffect(() => {
    const value = localStorage.getItem("Name")
    const items = JSON.parse(value);
    if (items) {
      setUser(items)
      // Data()
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    try {
      await db.ref("users").child(params.user.uid).child(params.user.uid+user.uid).push({
        content: content,
        timestamp: Date.now(),
        receiver:params.user.uid,
        sender:user.uid,
      });
      setContent(" ");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      {/* <div 
        // onSubmit={handleSubmit}
      >
        {/* <div className="users" onChange={handleChange}>
          {users.map(users => {
            return <p key={users.timestamp}>{users.content}</p>
          })}
        </div> 
        <Form 
          // onSubmit={handleSubmit}
        >
          <input onChange={handleChange} value={content}></input>
          {error ? <p>{error.message}</p> : null}
          <Button type="submit">Send</Button>
        </Form>
      </div> */}

      <header id="msg-head">
        <h2 id="msg-h2">Chat</h2>
      </header>

      <div id="chat">
        <Form.Group id="msg-form" className="container " onSubmit={handleSubmit}>
          <Form.Control id="message-input" type="text" placeholder="Type a message" onChange={(e)=>handleChange(e)}/>
          <Button id="message-btn" type="submit"  style={{margin:"5px"}} ><SendFill /></Button>
        </Form.Group>
      </div>

      
    </>
  )
}

export default Messages;