import { Link } from "react-router-dom";
import React from "react";
import {Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <>
      <Navbar className="container-fluid" style={{backgroundColor: "#e3f2fd", fontFamily:"sans"}}>
        <Link to="/Home" className=" text-black text-decoration-none">Home  </Link>
        <div>  
          <Link to="/Login" className=" text-black text-decoration-none">Login  </Link>
          <Link to="/Register" className=" text-black text-decoration-none">Register</Link>
        </div>
      </Navbar>
    </>
  )
}
export default Home;