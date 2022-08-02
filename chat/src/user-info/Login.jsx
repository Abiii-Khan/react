/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { Button, Form, Card } from "react-bootstrap";
import {db} from "../firebase.js"
import { ref, onValue, push, update, remove } from "firebase/database";

const Login = (props) => {
  const initialValues = { username:"", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [user, setUser] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formValues.email, formValues.password, formValues.username)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log(user.email)
        setFormErrors({registered:"Login successful!"})
        onValue(ref(db, "/users"), querySnapShot => {
          querySnapShot.forEach((snap)=>{
            if(snap.val().email===user.email){
              localStorage.setItem("Name",JSON.stringify(snap.val().username));
              window.location.href = "/profile"
            }
          })
        })
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setFormErrors({email:"invalid email!"}) 
        } else if (error.code === "auth/wrong-password") {
          setFormErrors({password:"wrong password"})
        } else if (error.code === "auth/network-request-failed") {
          alert("network error! please make sure that you have a working network access");
        } 
      });
  };
  useEffect(() => {
    if (formErrors.length === 0 && isSubmit) {
      //
    }
  }, [formErrors]);

  return (
    <>
      {/* <div style={{width:"25rem", margin:"auto", marginTop:"100px", fontFamily:"serif", fontSize:"20px"}}> */}
      <Card className="container col-5" style={{margin:"auto", boxShadow:"2px 2px 15px", marginTop:"100px", fontFamily:"serif", fontSize:"20px"}}>
        <Card.Body>
          <Card.Title className="text-center pb-3">Login</Card.Title>
          <Form className="container" onSubmit={handleSubmit}>
            <Form.Group className="m-1 p-1">
              <Form.Label>Email :</Form.Label>
              <Form.Control type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="example@email.com" required></Form.Control>
              <Form.Text style={{color: "red"}} >{formErrors.email}</Form.Text><br/>
              <Form.Label>Password :</Form.Label>
              <Form.Control type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="******" required></Form.Control>
              <Form.Text style={{color: "red"}} >{formErrors.password}</Form.Text><br/>
              <Button type="submit" variant="primary">Start Chat</Button><br/>
              <Form.Text style={{color: "green"}} >{formErrors.registered}</Form.Text><br/>
            </Form.Group>
            <Form.Text >Don&apos;t have an account? <Link to="/Register">Register</Link></Form.Text>
          </Form>
        </Card.Body>
      </Card>
      {/* </div>   */}
    </>
  );
};

export default Login;