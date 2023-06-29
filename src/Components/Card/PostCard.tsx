import Link from "next/link";
import React from "react";
import styles from "./PostCard.module.css";

interface PostCardProps {
  id: string;
  title: string;
  form: string;
  price: number;
  photo: string;
  console: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  form,
  price,
  photo,
  console,
}) => {
  return (
    <>
      <Link className={styles.link} href={`Game/${id}`}>
        <div className={styles.post}>
          <img className={styles.postImage} src={photo} alt="photo" />
          <div className={styles.postText}>
            <p className={styles.postTitle}>{title}</p>
            <p className={styles.postForm}>{console}</p>
            <p className={styles.postForm}>{form}</p>
            <h2 className={styles.postPrice}>{price}€</h2>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PostCard;
