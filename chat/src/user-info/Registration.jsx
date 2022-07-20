import React from "react";

const Register = ({isRegister}) => {
    return (
        <div className="main">
            <div className="form">
                <h1>Sign up</h1>
                <form className="text">
                    <label htmlFor="name">User Name : </label><br/>
                    <input type="text" className="it" id="name" name="name" autoComplete="none" placeholder="username"/><br/><br/>

                    <label htmlFor="email">Email :</label><br/>
                    <input type="email" className="it" id="email" name="email" placeholder="example@gmail.com"/><br/><br/>

                    <label className="mobile">Mobile no. :</label><br/>
                    <input type="tel" className="it" id="mobile" name="mobile" pattern="[0-9]{4}-[0-9]{7}" placeholder="0123-4567891"/><br/><br/>

                    <label htmlFor="pass">Password :</label><br/>
                    <input type="password" className="it" id="pass" name="pass" /><br/><br/>

                    <label htmlFor="cpass">Confirm Password :</label><br/>
                    <input type="password" className="it" id="cpass" name="cpass" /><br/><br/>
                    
                    {/* <form className="radio">
                        <p>Gender</p>
                        <input type="radio" id="male" name="male" />&nbsp;
                        <label className="male">Male</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="female" name="female" />&nbsp;
                        <label className="female">Female</label><br/>
                    </form> */}
                </form>
                <button type="submit" id="button">Register</button><br/>
                <p>Already have an account?
                <a href="#" onClick={() => isRegister(true)}>Login </a>
                </p>
            </div>
        </div>
    )
}

export default Register;