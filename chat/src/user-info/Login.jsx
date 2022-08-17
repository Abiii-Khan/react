/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { Button, Form, Card, Navbar } from "react-bootstrap";
import {db} from "../firebase.js"
import { ref, onValue, push, update, remove } from "firebase/database";

const Login = (props) => {
  const initialValues = { username:"", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [user, setUser] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

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
        const user = userCredential.user.email;
        // setUser(user);
        setLoading(true);
        setFormErrors({registered:"Login successful!"})
        onValue(ref(db, "/Users"), querySnapShot => {
          querySnapShot.forEach((snap)=>{
            if(snap.val().Signup.email===user){
              localStorage.setItem("Name",JSON.stringify(snap.val().Signup));
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
      <Navbar className="container-fluid" style={{backgroundColor: "#e3f2fd", fontFamily:"sans"}}>
        <Link to="/Home" className=" text-black text-decoration-none" style={{margin:"10px"}}>Home  </Link>
        <div className="nav-text">  
          <Link to="/Login" className=" text-black text-decoration-none" style={{margin:"20px"}}>Login  </Link>
          <Link to="/Register" className=" text-black text-decoration-none">Register</Link>
        </div>
      </Navbar>
      <div className="main-div">
        <Card className="container " style={{positon:"center", boxShadow:"2px 2px 15px"}}>
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
                {loading ? (
                  <div className="spinner-border m-2 text-info" />
                ) : (<></>) }
              </Form.Group>
              <Form.Text >Don&apos;t have an account? <Link to="/Register">Register</Link></Form.Text>
            </Form>
          </Card.Body>
        </Card>
      </div>  
    </>
  );
};

export default Login;