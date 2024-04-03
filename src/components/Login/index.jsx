"use client";
import React, { useCallback, useEffect, useState } from "react";
import css from "./style.module.css";
import { URL } from "@/helpers/constants";

import { v4 as uuidv4 } from "uuid";

import { useProduct } from "../Context";
import axios from "axios";

function Login(props) {
  const { handleLogined, toggleSpin, loginIndex,
    setloginIndex,users, fetchUsers } = useProduct();
  const [register, setRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  function handleLogin(e) {
    e.preventDefault();
    // Code to handle login (e.g., API calls, authentication) goes here
    // Once login is successful, you can close the popup
    props.toggle();
    fetchUsers();
  }

  const submitHandler = async () => {
    const index = users?.findIndex(
      (element) => element.password == password && element.name == username
    );

    if (index >= 0) {
      setloginIndex(index)
      props.toggle;
      toggleSpin(users[index].spins);
      handleLogined(true);
    } else {
      alert("Пароль або Ім`я не правильне!");
    }
  };

  const RegisterHandler = () => {
    setRegister(true);
  };

  const onRegister = async (e) => {
    e.preventDefault();

    const data = {
      id: uuidv4(),
      name: username,
      password: password,
      spins: 20,
    };

    if (username && password) {
      const index = users?.findIndex(
        (element) =>  element.name == username
      );
      if (index < 0) {
        try {
          const response = await axios.post(URL, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          alert("Успішно зареєстровано. Тепер увійдіть");
          setUsername("");
          setPassword("");
          setRegister(false);
          props.toggle();
          fetchUsers();
          return response;
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("таке ім`я вже зайняте!")
      }
    } else {
      alert("введіть пароль та ім`я!");
    }
  };

  return (
    <div className={css.popup}>
      {!register ? (
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
            <button onClick={RegisterHandler} className={css.register__button}>
              Зареєструватися
            </button>
          </form>
          <button onClick={props.toggle} className={css.close__button}>
            X
          </button>
        </div>
      ) : (
        <div className={css.popup__inner}>
          <h2>Зареєструватися</h2>
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
            <button onClick={(e) => onRegister(e)} className={css.login__button}>
              Зареєструватися
            </button>
          </form>
          <button onClick={props.toggle} className={css.close__button}>
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
