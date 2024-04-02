"use client";
import { React, useState } from "react";
import css from "./style.module.css";
import { salts } from "@/app/data";
import { useProduct } from "@/components/Context";
import SlotCounter from "react-slot-counter";
import { MdWidthFull } from "react-icons/md";

const Slot = () => {
  const { inventory, spins, toggleSpin, setInventory } = useProduct();
  const [cells, setCells] = useState(["S", "P", "I", "N"]); // Initial texts (can be any values)
  const [buttonWork, setButtonWork] = useState(false);
  const [secondTryShow, setSecondTryPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const spinSlots = () => {
    setButtonWork(true);
    if (spins >= 1) {
      toggleSpin(spins - 1);

      const newValues = [
        getRandomFirstElement(),
        getRandomIndex(),
        getRandomSecondElement(),
        getRandomIndex(),
      ];
      setCells([
        `${"?".repeat(newValues[0].length)}`,
        "?",
        `${"?".repeat(newValues[2].length)}`,
        "?",
      ]);
      setTimeout(() => setCells(newValues), 1500);
      const index = salts.findIndex(
        (el) => el.first__el == newValues[0] && el.second__el == newValues[2]
      );

      setTimeout(() => setButtonWork(spins <= 0), 2800);

      if (index >= 0) {
        const wonElement = salts[index];
        if (
          wonElement.first__index == newValues[1] &&
          wonElement.second__index == newValues[3]
        ) {
          setInventory((prevInventory) => [...prevInventory, wonElement]);
        } else {
          setTimeout(() => setSecondTryPopup(!secondTryShow), 2700);
        }
      }
    } else {
      alert("не достатньо спінів!");
      setButtonWork(false);
    }
  };
  // console.log("spins: ", spins);
  // console.log(inventory);

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
    const options = ["1", "2", "3"];
    return options[Math.floor(Math.random() * options.length)];
  };

  const handleEdit = (index, newValue) => {
    const updatedArray = [...cells];
    updatedArray[index] = newValue;
    setCells(updatedArray);
  };

  const handleFinishEdit = (index, newValue) => {
    if (newValue) {
      const updatedArray = [...cells];
      updatedArray[index] = newValue;
      setCells(updatedArray);
      setEditingIndex(null); // Stop editing
    } else {
      const updatedArray = [...cells];
      updatedArray[index] = "0";
      setCells(updatedArray);
      setEditingIndex(null);
    }
  };

  const handleRemake = () => {
    const index = salts.findIndex(
      (el) => el.first__el == cells[0] && el.second__el == cells[2]
    );

    setSecondTryPopup(false);

    if (
      salts[index].first__index == cells[1] &&
      salts[index].second__index == cells[3]
    ) {
      alert("Ти повернув свій спін назад :)");
      toggleSpin(spins + 1);
    } else {
      alert("Не правильно :( Вчи хімію краще, щоб наступного разу вдалося");
    }
  };

  return (
    <div className={css.slots__container}>
      <div
        className={
          secondTryShow
            ? `${css.second__popup} ${css.active}`
            : `${css.second__popup}`
        }
      >
        <div className={css.popup__inner}>
          <h2 className={css.second__title}>
            Програшний спін, але є ще другий шанс!
          </h2>
          <p className={css.second__desc}>
            Застосуй свої знання хімії, щоб зберегти свій спін. Заміни індекси
            так, щоб формула була правильною
          </p>

          <div className={css.edit__container}>
            {cells.map((string, index) => (
              <div key={index}>
                {editingIndex === index && index % 2 == 1 ? (
                  <input
                    type="text"
                    value={string}
                    onChange={(e) => handleEdit(index, e.target.value)}
                    onBlur={(e) => handleFinishEdit(index, e.target.value)}
                    className={css.editable__input} // Apply the input field style
                    style={{ width: `${string.length}ch` }}
                  />
                ) : (
                  <p
                    onClick={() => setEditingIndex(index)}
                    className={
                      index % 2 == 1
                        ? `${css.editable__string} ${css.pointer}`
                        : `${css.editable__string}`
                    } // Apply the <p> tag style
                  >
                    {string}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setSecondTryPopup(false)}
            className={css.close__button}
          >
            X
          </button>
          <button onClick={handleRemake} className={css.remake__button}>
            Виправити
          </button>
        </div>
      </div>
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
        disabled={buttonWork}
        className={css.spin__button}
        onClick={spinSlots}
      >
        Крутити
      </button>
    </div>
  );
};

export default Slot;
