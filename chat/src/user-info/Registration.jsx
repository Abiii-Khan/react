import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const initialValues = {username: "", email: "",password: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
     
  const handleChange=(e)=>{
    const {name , value} = e.target;
    setFormValues({...formValues , [name] : value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);


    const auth = getAuth();
    createUserWithEmailAndPassword(auth,formValues.email,formValues.password)
      .then((userCredential) => {
        alert("user created with email ",userCredential.user.email)
        console.log(userCredential)
      })
      .catch((error) => {
        alert(error)
      // console.log(error)
      });
  };

  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="main">
      <div className="form">
        <h1>Sign up</h1>
        <form className="text" onSubmit={handleSubmit}>
          <label htmlFor="username">User Name : </label><br/>
          <input type="text" className="it" value={formValues.username} onChange={handleChange}  name="username" autoComplete="none" placeholder="username"/><br/>
          <p className="err">{formErrors.username}</p><br/>

          <label htmlFor="email">Email :</label><br/>
          <input type="email" className="it" value={formValues.email} onChange={handleChange} name="email" placeholder="example@gmail.com" /><br/>
          <p className="err">{formErrors.email}</p><br/>

          <label htmlFor="mobile">Mobile no. :</label><br/>
          <input type="number" className="it no-arrow" name="mobile" pattern="[0-9]{4}-[0-9]{7}" placeholder="01234567891"/><br/><br/>

          <label htmlFor="pass">Password :</label><br/>
          <input type="password" className="it" name="password" value={formValues.password} onChange={handleChange} placeholder="password" /><br/>
          <p className="err">{formErrors.password}</p><br/>

          <button type="submit" id="button">Register</button><br/>
        </form>
        <p id="account"> Already have an account? <Link to="/Login">Login</Link></p>
      </div>
      <Outlet />
    </div>
  )
}

export default Register;