import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = (props) => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [user, setUser] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        // console.log('vivz===>',error)
        // const errorCode = error.code;
        // const errorMessage = error.message;
        alert(error);
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

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="main ">
      <div className="form bg-img">
        <h1>Login</h1>
        <form className="text" onSubmit={handleSubmit}>
          <label htmlFor="name">Email :</label>
          <br />
          <input
            type="text"
            className="it"
            name="email"
            placeholder="example@gmail.com"
            value={formValues.email}
            onChange={handleChange} />
          <br />
          <p className="err">{formErrors.email}</p>
          <br />

          <label htmlFor="password">Password :</label>
          <br />
          <input
            type="password"
            className="it"
            name="password"
            placeholder="******"
            value={formValues.password}
            onChange={handleChange}
          />
          <br />
          <p className="err">{formErrors.password}</p>
          <br />

          <button type="submit" id="button" className="btn">
            {" "}
            <Link
              to={`/Profile/${JSON.stringify(user)}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              Start Chat
            </Link>
          </button>
          <br />
        </form>
        <p id="account">
          {" "}
          Don't have an account? <Link to="/Register">Register</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
