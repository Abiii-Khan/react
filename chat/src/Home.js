import { Link } from "react-router-dom";
import React from "react";
import {Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <>
      <Navbar className="container-fluid" style={{backgroundColor: "#e3f2fd", fontFamily:"sans"}}>
        <Link to="/" className=" text-black text-decoration-none" style={{margin:"10px"}}>Home  </Link>
        <div className="nav-text">  
          <Link to="/Login" className=" text-black text-decoration-none" style={{margin:"20px"}}>Login  </Link>
          <Link to="/Register" className=" text-black text-decoration-none">Register</Link>
        </div>
      </Navbar>
    </>
  )
}
export default Home;