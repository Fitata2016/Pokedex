import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate =useNavigate();

  const submit = e => {
    e.preventDefault();
    console.log(userName);
    dispatch({
      type: "GET_USERNAME",
      payload: userName  //contenido que se encuentre en el input
    });
    
    setUserName("");
    navigate("/characters");
  } 

  return (
    <div className="container-login">
      <form action="" onSubmit={submit}>
        <h3>Ingresa tu nombre para comenzar! </h3>
        
        <input
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
