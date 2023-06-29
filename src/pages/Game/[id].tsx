import Header from "@/Components/Header/Header";
import axios from "axios";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";


interface PostData {
  photo: string;
  written_by: string;
  title: string;
  console: string;
  form: string;
  price: number;
  description: string;
}

interface UserData {
  username: string;
  phone: string;
  email: string;
}

const Post = () => {
  const [post, setPost] = useState<PostData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();
  const fetchPost = async () => {
    console.log(router.query.id);
    const response = await axios.get(
      `https://gamesbe.adaptable.app/post/${router.query.id}`
    );
    console.log(response);
    const { data } = response;
    setPost(data.post);
  };

  const fetchUser = async () => {
    if (post) {
      try {
        const response = await axios.get(
          `https://gamesbe.adaptable.app/user/${post.written_by}`
        );
        const { data } = response;
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [post]);

  useEffect(() => {
    router.query.id && fetchPost();
  }, [router.query.id]);

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.section1}>
          {post && (
            <div>
              <img className={styles.image} src={post.photo} alt="game photo" />
            </div>
          )}
          {user && (
            <>
              <div className={styles.userInfoWrapper}>
                <h2>Seller</h2>
                <hr className={styles.line} />
                <p>{user.username}</p>
                <hr className={styles.line} />
                <p>+{user.phone}</p>
                <hr className={styles.line} />
                <p>{user.email}</p>
              </div>
            </>
          )}
        </div>
        <div className={styles.sectionLine}></div>
        <div className={styles.section2}>
          {post && (
            <>
              <div className={styles.gameInfoWrapper}>
                <div className={styles.gameInfo}>
                  <p className={styles.gameInfoText}>{post.title}</p>
                </div>
                <div className={styles.gameInfo}>
                  <p className={styles.gameInfoText}>{post.console}</p>
                </div>
                <div className={styles.gameInfo}>
                  <p className={styles.gameInfoText}>{post.form}</p>
                </div>
              </div>
              <div className={styles.priceWrappper}>
                <div className={styles.price}>{post.price} €</div>
              </div>
            </>
          )}
        </div>
        <div className={styles.section3}>
          <div className={styles.aboutWrapper}>
            <h3 className={styles.aboutHeader}> About this game</h3>
            <p className={styles.aboutText}></p>
            {post && (
            <>
              <p className={styles.aboutText}>{post.description}</p>
            </>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
