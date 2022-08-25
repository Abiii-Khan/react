/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHref } from "react-router-dom";
import { SendFill } from "react-bootstrap-icons";
import { Button, Form, Modal } from "react-bootstrap";
import {
  Text,
  Flex,
  Input,
  ChakraProvider,
  FormControl,
} from "@chakra-ui/react";
import { db } from "../firebase.js";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getDatabase,
  ref,
  push,
  onValue,
  set,
  remove,
} from "firebase/database";

const Messages = () => {
  const location = useLocation();
  const userDetails = location.state;
  const [content, setContent] = useState("");
  const [user, setUser] = useState();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const value = localStorage.getItem("Name");
    const profileUser = JSON.parse(value);
    if (profileUser) {
      setUser(profileUser);
      data(profileUser);
    }
  }, []);

  const data = (profileUser) => {
    setAll("");
    var messageText = [];
    onValue(
      ref(db, "/Users/Chat/" + profileUser.uid + userDetails.uid),
      (querySnapShot) => {
        messageText = [];
        querySnapShot.forEach((snap) => {
          messageText.push(snap.val());
        });
        setAll(messageText);
      }
    );
    setAll(messageText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const firstuserkey = push(
      ref(db, "Users/Chat/" + user.uid + userDetails.uid)
    ).key;
    const sender = ref(
      db,
      "Users/Chat/" + user.uid + userDetails.uid + "/" + firstuserkey
    );

    set(sender, {
      message: content,
      sender: user.uid + "/" +  user.username,
      receiver: userDetails.uid + "/" + userDetails.username,
      messageId: firstuserkey,
    })
      .then((e) => {
        const receiver = ref(
          db,
          "Users/Chat/" + userDetails.uid + user.uid + "/" + firstuserkey
        );

        set(receiver, {
          message: content,
          sender: user.uid + "/" +  user.username,
          receiver: userDetails.uid + "/" +  userDetails.username,
          messageId: firstuserkey,
        });
      })
      .then(() => data(user));
    setContent("");
  };

  const deleteForMe = (messageId) => {
    setShow(false);
    const keyref = ref(
      db,
      "Users/Chat/" + user.uid + userDetails.uid + "/" + messageId
    );
    const keyrefs = ref(
      db,
      "Users/Chat/" + userDetails.uid + user.uid + "/" + messageId
    );
    if (keyref) {
      remove(keyref);
    } else if (keyrefs) {
      remove(keyrefs);
    }
  };
  const deleteForEveryone = (messageId) => {
    setShow(false);
    const keyref = ref(
      db,
      "Users/Chat/" + user.uid + userDetails.uid + "/" + messageId
    );
    const keyrefs = ref(
      db,
      "Users/Chat/" + userDetails.uid + user.uid + "/" + messageId
    );
    remove(keyref).then(() => {
      remove(keyrefs).then(() => data(user));
    });
  };

  const [modalValues, setModalValues] = useState();
  const modalFun = (senderMessages) => {
    handleShow();
    setModalValues(senderMessages.messageId);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  if (loading) {
    return <>
      <div className="d-flex justify-content-center m-9">
        <div className="spinner-border" style={{width: "3rem", height: "3rem", marginTop: "9px"}}>
        </div>
      </div>
    </>
  } else {
    return (
      <React.Fragment>
        <ChakraProvider >
          <div id="msg-head">
            <header>
              <h2 id="msg-h2">{userDetails.username}</h2>
            </header>
          </div>
          <Modal
            className="modal"
            value={modalValues}
            show={show}
            onHide={handleClose}
          >
            <Modal.Body>
              Are you sure you want to delete this message?
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => deleteForMe(modalValues)}
              >
                Delete for me
              </Button>
              <Button
                variant="primary"
                onClick={() => deleteForEveryone(modalValues)}
              >
                Delete for everyone
              </Button>
            </Modal.Footer>
          </Modal>
          <div>
            {all.map((senderMessages, index) => {
              if (senderMessages.sender === user.uid + "/" + user.username) {
                return (
                  <>
                    <Flex 
                      key={senderMessages.messageId}
                      w="100%"
                      justify="flex-end"
                      onClick={() => modalFun(senderMessages)}
                    >
                      <Flex id="textStyle" bg="grey"  >
                        <Text>{senderMessages.message}</Text>
                      </Flex>
                    </Flex>
                  </>
                );
              } else {
                return (
                  <Flex w="100%" onClick={() => modalFun(senderMessages)} key={index}>
                    <Flex id="textStyle" bg="rgb(20, 131, 243)">
                      <Text>{senderMessages.message}</Text>
                    </Flex>
                  </Flex>
                );
              }
            })}
            <AlwaysScrollToBottom />
          </div>
          <div className="msg-footer container">
            <Flex mt="5">
              <Form onSubmit={handleSubmit}>
                <Form.Group id="msg-form" className="container">
                  <Form.Control
                    value={content}
                    type="textarea"
                    placeholder="Type a message"
                    width="auto"
                    onChange={(e) => handleChange(e)}
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    id="message-btn"
                    style={{ margin: "5px" }}
                  >
                    <SendFill />
                  </Button>
                </Form.Group>
              </Form>
            </Flex>
          </div>
        </ChakraProvider>
      </React.Fragment>
    );
  }
};

export default Messages;
