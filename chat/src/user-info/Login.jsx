import React from "react";

const Login = ({isLogin}) => {

    return (
        <div className="main">
            <div className="form">
                <h1>Login</h1>
                <form className="text">
                    <label htmlFor="name">User Name :</label><br/>
                    <input type="text" className="it" id="name" name="name" placeholder="username"/><br/><br/>
                    <label htmlFor="pass">Password :</label><br/>
                    <input type="password" className="it" id="pass" name="pass" placeholder="******"/><br/><br/>
                </form>
                <button type="submit" id="button" className="btn btn-primary jubmotron bg-success">Start Chat</button><br/>
                <p> Not a member? 
                    <a href="#" onClick={() => isLogin(false)}>Register </a>
                </p>
            </div>
        </div>
    )
}

export default Login;