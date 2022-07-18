import React from "react";

const form = () => {
    return (
        <>
            <div className="main">
            <h1>Login Form</h1>
                <form>
                    <div className="text">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" autoComplete="none" />
                    </div>
                    <div className="text">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password" />
                    </div>
                    <button type="submit" >login</button>
                </form>
            </div>
        </>
    )
}
export default form;