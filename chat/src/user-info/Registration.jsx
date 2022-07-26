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
    setIsSubmit(true);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth,formValues.email,formValues.password)
      .then((userCredential) => {
        setFormErrors({registered:"Account created successfully!"})
        console.log(userCredential)
      })
      .catch((error) => {
        if (error.code === "auth/internal-error") {
          alert("Please fill all the fields")
        } else if (error.code === "auth/email-already-in-use") {
          setFormErrors({email:"email already in use, use a different email."})
        } else if (error.code === "auth/invalid-email") {
          setFormErrors({email:"invalid email!"}) 
        } else if (error.code === "auth/network-request-failed") {
          alert("network error! please make sure that you have a working network access");
        } else if (error.code === "auth/invalid-password") {
          setFormErrors({password:"invalid password!"})
        } else if (error.code === "auth/weak-password") {
          setFormErrors({password:"weak password! Password should be at least 6 characters"})
        }
      });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // errors
    }
  });
  // const validate = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (values.password.length < 6) {
  //     errors.password = "Password must be more than 6 characters";
  //   } else if (values.password.length > 10) {
  //     errors.password = "Password cannot exceed more than 10 characters";
  //   }
  //   return errors;
  // };

  return (
    <div className="main">
      <div className="form">
        <h1>Sign up</h1>
        {
          
        }
        <form className="text" onSubmit={handleSubmit}>
          <label htmlFor="username">User Name : </label><br/>
          <input type="text" className="it" value={formValues.username} onChange={handleChange}  name="username" autoComplete="none" placeholder="username" required/><br/>
          <p className="err">{formErrors.username}</p><br/>

          <label htmlFor="email">Email :</label><br/>
          <input type="email" className="it" value={formValues.email} onChange={handleChange} name="email" placeholder="example@gmail.com" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/><br/>
          <p className="err">{formErrors.email}</p><br/>

          {/* <label htmlFor="mobile">Mobile no. :</label><br/>
          <input type="number" className="it no-arrow" name="mobile" value={formValues.mobile} onChange={handleChange} pattern="[0-9]{4}-[0-9]{7}" placeholder="01234567891" required/><br/>
          <p className="err">{formErrors.mobile}</p><br/> */}

          <label htmlFor="pass">Password :</label><br/>
          <input type="password" className="it" name="password" value={formValues.password} onChange={handleChange} placeholder="password" required/><br/>
          <p className="err">{formErrors.password}</p><br/>

          <button type="submit" id="button">Register</button><br/>
          <p className="err create">{formErrors.registered}</p><br/>

        </form>
        <p id="account"> Already have an account? <Link to="/Login">Login</Link></p>
      </div>
      <Outlet />
    </div>
  )
}

export default Register;