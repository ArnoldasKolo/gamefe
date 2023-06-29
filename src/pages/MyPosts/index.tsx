import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Header from "@/Components/Header/Header";
import PostCard from "@/Components/Card/PostCard";
import router, { useRouter } from "next/router";
import Cookies from "js-cookie";

interface Post {
  id: string;
  title: string;
  console: string;
  form: string;
  price: number;
  photo: string;
}

const Booked: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const fetchAllUsersPosts = async () => {
    try {
      const response = await axios.get<{ user: { createdPosts: Post[] } }>(
        "https://gamesbe.adaptable.app/AllUsersPosts",
        {
          headers: {
            authorization:  Cookies.get('GameToken'),
          },
        }
      );

      const { data } = response;
      // @ts-ignore
      console.log(data.user[0].createdPosts);
      // @ts-ignore
      setPosts(data.user[0].createdPosts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };



  useEffect(() => {
    fetchAllUsersPosts();
  }, []);


  const deletePost = async (postId: string) => {
    const response = await axios.delete(
      `https://gamesbe.adaptable.app/deletePost/${postId}`
    );
    console.log(response)
    if (response.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        // setSuccess(false);
        router.push("/");
      }, 1000);
    }
    
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div>
          <h3 className={styles.sectionHeader}>My posts</h3>
          {success && (
                <div className={styles.deleteText}>Post was deleted</div>
              )}
          <div className={styles.cardsWrapper}>
            {posts.map((post) => (
              <div key={post.id}>
                <PostCard
                  id={post.id}
                  title={post.title}
                  console={post.console}
                  form={post.form}
                  price={post.price}
                  photo={post.photo}
                />
                <button onClick={() => deletePost(post.id)} className={styles.delete}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Booked;
