import React, { useEffect, useState } from "react";
import logo from "../../Images/logo.png";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import burger from "../../Images/burger.png";
import search from "../../Images/search.png";
import router from "next/router";
import playstation from "../../Images/playstation 2.png";
import xbox from "../../Images/xbox 1.png";
import steam from "../../Images/social-steam 1.png";
import Cookies from 'js-cookie';

const DekstopMenu = () => {
  return (
    <>
      <div className={styles.menu}>
        <ul className={styles.nav}>
          <Link className={styles.navOptionLink} href={"/login"}>
            <li className={styles.logIn}>Log in</li>
          </Link>
          <Link className={styles.navOptionLink} href={"/signup"}>
            <li className={styles.signUp}>Sign up</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

const DekstopMenuLoggedIn = () => {
  return (
    <>
      <div className={styles.menu}>
        <ul className={styles.nav}>
          <Link className={styles.navOptionLink} href={"/Post"}>
            <li className={styles.logIn}>Post</li>
          </Link>
          <Link className={styles.navOptionLink} href={"/MyPosts"}>
            <li className={styles.signUp}>My Posts</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

type MobileNavProps = {
  active: boolean;
};

const MobileNav: React.FC<MobileNavProps> = (props) => {
  return (
    <>
      <div
        className={`${props.active ? styles.mobileMenu : styles.menuClosed}`}
      >
        <ul className={styles.mobnav}>
          <Link className={styles.navOptionLinkMob} href={"/login"}>
            <li className={styles.logInMob}>Log in</li>
          </Link>
          <Link className={styles.navOptionLink} href={"/signup"}>
            <li className={styles.signUpMob}>Sign up</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

const MobileNavLoggedIn: React.FC<MobileNavProps> = (props) => {
  return (
    <>
      <div
        className={`${props.active ? styles.mobileMenu : styles.menuClosed}`}
      >
        <ul className={styles.mobnav}>
          <Link className={styles.navOptionLinkMob} href={"/Post"}>
            <li className={styles.logInMob}>Post</li>
          </Link>
          <Link className={styles.navOptionLink} href={"/MyPosts"}>
            <li className={styles.signUpMob}>My Posts</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

const Header = () => {
  const [active, setActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwtToken = Cookies.get('GameToken');
    if (jwtToken) {
      const decodedToken = decodeJWTToken(jwtToken);
      if (decodedToken && !isTokenExpired(decodedToken.exp)) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("GameToken"); // Clear the invalid token
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const decodeJWTToken = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.log("Failed to decode JWT token:", error);
      return null;
    }
  };

  const isTokenExpired = (expirationTime: number) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return expirationTime < currentTime;
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.logoNavWrapper}>
          <Link href={"/"}>
            <Image className={styles.navLogo} src={logo} alt="logo" />
          </Link>
          <ul className={styles.logoNav}>
            <Link className={styles.logoNavLink} href={"/"}>
              <li className={styles.logoNavOption}>Explore</li>
            </Link>
          </ul>
        </div>
        <div className={styles.platformWrapper}>
          <Link className={styles.platformLink} href={"/playstation"}>
            <Image
              className={styles.platformImage}
              src={playstation}
              alt="ps"
            />
          </Link>
          <Link className={styles.platformLink} href={"/pc"}>
            <Image className={styles.platformImage} src={steam} alt="steam" />
          </Link>
          <Link className={styles.platformLink} href={"/xbox"}>
            <Image className={styles.platformImage} src={xbox} alt="xbox" />
          </Link>
        </div>
        {isLoggedIn ? <DekstopMenuLoggedIn /> : <DekstopMenu />}
        <button
          className={styles.burgerButton}
          onClick={() => {
            setActive((prevState) => !prevState);
          }}
        >
          <Image className={styles.burger} src={burger} alt="" />
        </button>
      </div>
      <div className={styles.mobileMenuWrapper}>
        {isLoggedIn ? (
          <MobileNavLoggedIn active={active} />
          
        ) : (
          <MobileNav active={active} />
        )}
      </div>
    </>
  );
};

export default Header;
