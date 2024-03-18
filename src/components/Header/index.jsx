"use client";


import React from "react";
import css from "./style.module.css";
import Image from "next/image";
import logo from "@/app/static/logo.png"
import Link from "next/link";
import { useProduct } from "../Context";

const Header = () => {
  const { inventory, spins, setSpins, setInventory } = useProduct();
  return (
    <header className={css.site__header}>
      <Link className={css.logo} href="/"> <Image
          src={logo}
          alt="Chemical Slots"
          width={120} 
          height={120} 
        /></Link>
        <div className={css.count}>
          <span>spins: {spins}</span>
          <span>inventory items: {inventory.length}</span>
        </div>
      <nav className={css.nav__links}>
        <Link href="/slots">Slot</Link>
        <Link href="/jackpot">Jackpot</Link>
        <Link href="/trader">Trader</Link>
        <button className={css.auth__button}>Log In</button>
      </nav>
    </header>
  );
};

export default Header;
