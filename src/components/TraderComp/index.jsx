"use client";

import React from "react";
import { useState } from "react";
import { salts } from "@/app/data";
import css from "./style.module.css";
import { useProduct } from "../Context";

const TraderComp = () => {
  const { inventory, setInventory, spins, setSpins } = useProduct();
  console.log(inventory);
  const handleOpenItem = (item, e) => {
    const index = e.target.id;
    setSpins(spins + item.price);
    const updatedInventory = inventory.filter((i, num) => num != index);
    setInventory(updatedInventory);
  };

  return (
    <div className="container">
      <h2 className={css.trader__title}>Інвентар</h2>
      {inventory.map((item, index) => (
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
      ))}
      <p className={css.total__spins}>Total Spins: {spins}</p>
    </div>
  );
};

export default TraderComp;
