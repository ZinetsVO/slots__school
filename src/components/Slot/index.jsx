"use client";
import { React, useContext, useState } from "react";
import css from "./style.module.css";
import { salts } from "@/app/data";
import { useProduct } from "@/components/Context";
import SlotCounter from "react-slot-counter";

const Slot = () => {
  const { inventory, spins, setSpins, setInventory } = useProduct();
  const [cells, setCells] = useState(["#", "#", "#", "#"]); // Initial texts (can be any values)

  const spinSlots = () => {
    if (spins >= 1) {
      setSpins(spins - 1);
      const newValues = [
        getRandomFirstElement(),
        getRandomIndex(),
        getRandomSecondElement(),
        getRandomIndex(),
      ];
      const index = salts.findIndex(
        (el) => el.first__el == newValues[0] && el.second__el == newValues[2]
      );

      if (index >= 0) {
        const wonElement = salts[index];
        if (
          wonElement.first__index == newValues[1] &&
          wonElement.second__index == newValues[3]
        ) {
          setInventory((prevInventory) => [...prevInventory, wonElement]);
        } else {
          console.log("loser!");
        }
      }
      setCells(["*", "*", "*", "*"]);
      setCells(newValues);
    } else {
      alert("not enough spins!");
    }
  };
  console.log("spins: ", spins);
  console.log(inventory);

  const getRandomFirstElement = () => {
    const options = ["Na", "Mg", "Ca"];
    return options[Math.floor(Math.random() * options.length)];
  };
  const getRandomSecondElement = () => {
    const options = ["NO3", "SO4", "Cl"];
    return options[Math.floor(Math.random() * options.length)];
  };
  const getRandomIndex = () => {
    // Adjust probabilities here
    const options = [1, 2, 3];
    return options[Math.floor(Math.random() * options.length)];
  };

  return (
    <div className={css.slots__container}>
      <div className={css.slot__row}>
        {cells.map((text, index) => (
          <div className={css.slot__cell}>
            <SlotCounter
              animateUnchanged
              startValueOnce
              key={index}
              value={text}
              charClassName={css.cell__text}
              direction="bottom-up"
              autoAnimationStart={false}
            ></SlotCounter>
          </div>
        ))}
      </div>
      <button
        disabled={spins <= 0}
        className={css.spin__button}
        onClick={spinSlots}
      >
        Spin
      </button>
    </div>
  );
};

export default Slot;
