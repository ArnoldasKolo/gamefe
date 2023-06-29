import React, { useEffect, useState } from "react";
import search from "../../Images/search.png";
import styles from "./styles.module.css";
import Image from "next/image";
import axios from "axios";
import PostCard from "@/Components/Card/PostCard";
import Header from "@/Components/Header/Header";

interface Post {
  id: string;
  title: string;
  console: string;
  form: string;
  price: number;
  photo: string;
}

const index = () => {
  const [form, setForm] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>("");

  const fetchAllPosts = async () => {
    const response = await axios.get<{ posts: Post[] }>(
      "https://gamesbe.adaptable.app/posts"
    );
    const { data } = response;
    console.log(data.posts);
    setPosts(data.posts);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.console === "Xbox" && // Filter only PlayStation games
      post.title.toLowerCase().includes(filter.toLowerCase()) &&
      (form === "" || post.form === form)
  );
  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.section2}>
          <h3 className={styles.section2Header}>Xbox Games</h3>
          <div className={styles.searchWrapper}>
            <Image className={styles.searchImage} src={search} alt="search" />
            <input
              type="text"
              placeholder="Game Name"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.selectWrapper}>
            <select
              id="platform"
              onChange={(event) => setForm(event.target.value)}
              className={styles.formSelect}
            >
              <option value="">All</option>
              <option value="Digital">Digital</option>
              <option value="Physical">Physical</option>
            </select>
          </div>
        </div>
        <div className={styles.section3}>
          <div className={styles.cardsWrapper}>
            {filteredPosts.map((post) => (
              <div key={post.id}>
                <PostCard
                  id={post.id}
                  title={post.title}
                  console={post.console}
                  form={post.form}
                  price={post.price}
                  photo={post.photo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;