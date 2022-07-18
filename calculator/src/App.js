import React from "react";
// import ReactDOM from "react-dom";
import * as cal from "./Calc";

function app()
{
  return (
  <>
    <h1>calculations</h1>
    <p>sum is {cal.add(2,2)}</p>
    <p>sub is {cal.sub(3,2)}</p>
    <p>mul is {cal.mul(3,3)}</p>
    <p>div is {cal.div(6,2)}</p>
  </>
);}

export default app;