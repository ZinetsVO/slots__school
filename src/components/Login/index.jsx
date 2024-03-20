"use client";
import React, {  useState } from "react";
import css from "./style.module.css";

import { useProduct } from "../Context";


function Login(props) {

 


  const { handleLogined, toggleSpin } = useProduct();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  function handleLogin(e) {
    e.preventDefault();
    // Code to handle login (e.g., API calls, authentication) goes here
    // Once login is successful, you can close the popup
    props.toggle();
  }

  const submitHandler = () => {
    if (username == "HimichnaGra" && password == "LubluHimiu") {
      props.toggle;
      toggleSpin(2)
      handleLogined(true);
    

    } else {
      alert("Пароль або Ім`я не правильне!")
    }
  };

  return (
    <div className={css.popup}>
      <div className={css.popup__inner}>
        <h2>Увійти</h2>
        <form className={css.login__form} onSubmit={handleLogin}>
          <div className={css.input__group}>
            <label htmlFor="username">Ім`я:</label>
            <input
              placeholder="ім`я"
              className={css.input__text}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={css.input__group}>
            <label htmlFor="password">Пароль:</label>
            <input
              placeholder="пароль"
              className={css.input__password}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={submitHandler}
            className={css.login__button}
          >
            Увійти
          </button>
        </form>
        <button onClick={props.toggle} className={css.close__button}>
          X
        </button>
      </div>
    </div>
  );
}

export default Login;
