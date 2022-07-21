import React, { useState } from "react";
import Login from "./user-info/Login";
import Register from "./user-info/Registration";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  function pageHandler(flag){
    setIsLogin(flag);
  }
  return <>{isLogin ? <Login  isLogin={pageHandler}/> : <Register isRegister={pageHandler}/>}</>;
  // return (
    // <Register />
  // )/
};

export default App;
