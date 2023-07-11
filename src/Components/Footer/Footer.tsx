import React from "react";
import logo from "../../Images/logo.png";
import Image from "next/image";
import styles from "./Footer.module.css";
import Link from "next/link";
const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Image src={logo} alt="logo" />
        </div>
        <div className={styles.links}>
            <ul>
                <Link className={styles.link} href="./"> <li>Main Page</li></Link>
                <Link className={styles.link} href="./xbox"> <li>Xbox Games</li></Link>
                <Link className={styles.link} href="./playstation"> <li>Playstation Games</li></Link>
                <Link className={styles.link} href="./pc"> <li>PC Games</li></Link>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
