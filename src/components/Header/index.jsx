"use client";

import React from "react";
import css from "./style.module.css";
import Image from "next/image";
import logo from "@/app/static/logo.png";
import Link from "next/link";
import { useProduct } from "../Context";
import Login from "../Login";
import { MdAccountCircle } from "react-icons/md";


const Header = () => {
  const { inventory, spins, togglePop, seen, logined} = useProduct();

  console.log('logined: ' ,logined);

  return (
    <header className={css.site__header}>
      <Link className={css.logo} href="/">
        <Image src={logo} alt="Chemical Slots" width={120} height={120} />
      </Link>
      <div className={css.count}>
        <span>кількість спінів: {spins}</span>
        <span>кількість солей: {inventory.length}</span>
      </div>
      <nav className={css.nav__links}>
        <Link href="/slots">Слот</Link>
        <Link href="/trader">Розтворювач</Link>
        {!logined ? (
          <button className={css.auth__button} onClick={togglePop}>
            Увійти
          </button>
        ) : (
          <MdAccountCircle size={30}/>
        )}
        {seen && <Login toggle={togglePop} />}
      </nav>
    </header>
  );
};

export default Header;
