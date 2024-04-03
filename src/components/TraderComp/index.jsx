"use client";

import React from "react";
import { useState } from "react";
import { salts } from "@/app/data";
import css from "./style.module.css";
import { useProduct } from "../Context";
import axios from "axios";
import { URL } from "@/helpers/constants";


const TraderComp = () => {
  const { inventory, setInventory, spins, toggleSpin, users, fetchUsers, loginIndex } = useProduct();
  const handleUserSpins = (newSpins) => {
    const formData = {
      ...users[loginIndex],
      [`spins`]: newSpins,
    };
    try {
      const response = axios.put(`${URL}/${users[loginIndex].id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchUsers();
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleOpenItem = (item, e) => {
    const index = e.target.id;
    toggleSpin(spins + item.price);
    handleUserSpins(spins + item.price)
    const updatedInventory = inventory.filter((i, num) => num != index);
    setInventory(updatedInventory);
  };

  return (
    <div className="container">
      <h2 className={css.trader__title}>Інвентар</h2>
      
      {inventory.length>0 ? (
        inventory.map((item, index) => (
          <div key={index} className={css.inventory__item}>
            <div className={css.item__text}>
              <span className={css.item__name}>{`${item.first__el}${
                item.first__index != 1 ? item.first__index : ""
              }${item.second__el}${
                item.second__index != 1 ? item.second__index : ""
              }`}</span>
              <span className={css.item__price}>{`${item.price} спінів`}</span>
            </div>
            <button
              id={index}
              className={css.open__button}
              onClick={(e) => handleOpenItem(item, e)}
            >
              Розтворити
            </button>
          </div>
        ))
      ) : (
        <h3 className={css.emplty__text}>
          Ой ой! У вас немає жодної солі. Нумо крутити слоти, щоб
          отримати солі
        </h3>
      )}
    </div>
  );
};

export default TraderComp;
