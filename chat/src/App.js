import React, { useState } from "react";
import Login from "./user-info/Login";
import Register from "./user-info/Registration";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  function pageHnadler(flag){
    setIsLogin(flag);
  }

  return <>{isLogin ? <Login  isLogin={pageHnadler}/> : <Register isRegister={pageHnadler}/>}</>;
};

export default App;
