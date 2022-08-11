/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from "react";
import { useLocation, useHref } from "react-router-dom";
import { SendFill } from "react-bootstrap-icons";
import { Button, Form } from "react-bootstrap";
import { Flex, Text } from "@chakra-ui/react";
import { db } from "../firebase.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { child, getDatabase, ref, push, onValue, set } from "firebase/database";

const Messages = (props) => {
  const location = useLocation();
  const userDetails = location.state;
  const [content, setContent] = useState();
  const [user, setUser] = useState();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const value = localStorage.getItem("Name")
    const items = JSON.parse(value);
    if (items) {
      setUser(items)
      Data(items)
    }
  }, [content]);
  const Data = (item) => {
    setAll("")
    var list = [];
    onValue(ref(db, "/Users/" + item.uid + "/Chat/"), querySnapShot => {
      querySnapShot.forEach((snap) => {
        list = [];
        snap.forEach((item) => {
          list.push(item.val())
          console.log(item.val())
        })
      })
    })
    setAll(list)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError(null);
    // console.log(user.username);
    const db = getDatabase();
    const firstuserkey = push(ref(
      db,
      "Users/" + user.uid + "/Chat/" + user.uid + userDetails.uid)).key;
    const sender = ref(
      db,
      "Users/" + user.uid + "/Chat/" + user.uid  + userDetails.uid + "/" + firstuserkey
    );

    set(sender, {
      message: content,
      sender: user.uid,
      receiver: userDetails.uid,
      key: firstuserkey
    }).then((e) => {
      console.log(e)
      const seconduserkey = push(ref(db, "Users/" + userDetails.uid + "/Chat/" + userDetails.uid + user.uid)).key
      const receiver = ref(db, "Users/" + userDetails.uid + "/Chat/" + userDetails.uid + user.uid + "/" + seconduserkey)

      set(receiver, {
        message: content,
        sender: user.uid,
        receiver: userDetails.uid,
        key: seconduserkey
      }).then((e)=>{
        Data(user)
        setContent("")
      })
    })
  };
  if (loading) {
    return <div className="spinner-border m-5 text-center" />;
  } else {
    return (
      <>
        <header id="msg-head">
          <h2 id="msg-h2">{userDetails.username}</h2>
        </header>

        <div id="chat">
          {all.map((item, index) => {
            if (item.sender === user.uid) {
              return (
                <Flex key={index} w="100%" justify="flex-end">
                  <Flex
                    bg="black"
                    color="white"
                    minW="100px"
                    maxW="350px"
                    my="1"
                    p="3"
                  >
                    <Text>{item.message}</Text>
                  </Flex>
                </Flex>
              );
            } else {
              return (
                <Flex key={index} w="100%">
                  <Flex
                    bg="gray.100"
                    color="black"
                    minW="100px"
                    maxW="350px"
                    my="1"
                    p="3"
                  >
                    <Text>{item.message}</Text>
                  </Flex>
                </Flex>
              );
            }
          })}
          <Form.Group
            id="msg-form"
            className="container "
            onSubmit={handleSubmit}
          >
            <Form.Control
              id="message-input"
              type="text"
              placeholder="Type a message"
              onChange={handleChange}
              autoComplete="off"
            />
            <Button
              id="message-btn"
              type="submit"
              style={{ margin: "5px" }}
              onClick={handleSubmit}
            >
              <SendFill />
            </Button>
          </Form.Group>
        </div>
      </>
    );
  }
}

export default Messages;

