/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from "react";
import { useLocation, useHref } from "react-router-dom";
import { SendFill } from "react-bootstrap-icons";
import { Button, Form, Modal } from "react-bootstrap";
import { Divider, Flex, Text } from "@chakra-ui/react";
import { db } from "../firebase.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { child, getDatabase, ref, push, onValue, set,remove } from "firebase/database";
import { async } from "@firebase/util";

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
    const value = localStorage.getItem("Name")
    const items = JSON.parse(value);
    if (items) {
      setUser(items)
      Data(items)
    }
  }, []);
  
  const Data =(items) => {
    setAll("")
    var list = [];
    onValue(ref(db, "/Users/" + items.uid + "/Chat/"+items.uid+userDetails.uid), querySnapShot => {
      list=[]
      querySnapShot.forEach((snap) => {
        list.push(snap.val())
      })
      setAll(list)
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const firstuserkey = push(ref(db,"Users/" + user.uid + "/Chat/" + user.uid + userDetails.uid)).key;
    const sender = ref(db,"Users/" + user.uid + "/Chat/" + user.uid  + userDetails.uid + "/" + firstuserkey);
    console.log(sender);
        
    set(sender, {
      message: content,
      sender: user.uid,
      receiver: userDetails.uid,
      key: firstuserkey
    }).then((e) => {
      const receiver = ref(db, "Users/" + userDetails.uid + "/Chat/" + userDetails.uid + user.uid + "/" + firstuserkey)
          
      set(receiver, {
        message: content,
        sender: user.uid,
        receiver: userDetails.uid,
        key: firstuserkey
      })
    }).then(()=>Data(user))
    setContent("")
  };
  const Delete=(key)=>{
    setShow(false)
    const keyref = ref(db,"Users/"+user.uid+"/Chat/"+user.uid+userDetails.uid+"/"+key) 
    const keyrefs = ref(db,"Users/"+userDetails.uid+"/Chat/"+userDetails.uid+user.uid+"/"+key)
    remove(keyref).then(()=>{
      remove(keyrefs).then(()=>Data(user))
    })
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (loading) {
    return <div className="spinner-border m-5 text-center" />;
  } else {
    return (
      <>
        <header id="msg-head">
          <h2 id="msg-h2">
            {userDetails.username}
          </h2>
        </header>
        <div>
          {all.map((item, index) => {
            if (item.sender === user.uid) {
              return (
                <>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                      Are you sure you want to delete this message?
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                      <Button variant="secondary" onClick={handleClose}>
                       Cancel
                      </Button>
                      <Button variant="primary" onClick={()=>Delete(item.key)}>
                       Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Flex key={index} w="100%" justify="flex-end"
                    onClick={handleShow}
                  >
                    <Flex
                      bg="black"
                      color="white"
                      minW="100px"
                      maxW="350px"
                      my="1"
                      p="3"
                      key={item.key}
                    >
                      <Text>{item.message}</Text>
                    </Flex>
                  </Flex></>
              );
            } else {
              return (
                <Flex key={index} w="100%" 
                  onClick={handleShow}
                >
                  <Flex 
                    bg="gray"
                    color="white"
                    minW="100px"
                    maxW="350px"
                    my="1"
                    p="3"
                  >
                    <Text >{item.message}</Text>
                  </Flex>
                </Flex>
              );
            }
          })}
          <Form onSubmit={handleSubmit}>
            <Form.Group
              id="msg-form"
              className="container "
            >
              <Form.Control
                value={content}
                type="text"
                placeholder="Type a message"
                onChange={(e)=>handleChange(e)}
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
        </div>
      </>
    );
  }
}

export default Messages;

