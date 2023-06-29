import Header from "@/Components/Header/Header";
import React, { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

interface Game {
  title: string;
  console: string;
  form: string;
  price: string;
  description: string;
  photo: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [gameConsole, setGameConsole] = useState("");
  const [gameForm, setGameForm] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [inputFail, setInputFail] = useState(false);
  const [badData, setBadData] = useState("");

  const createGame = async () => {
    const game: Game = {
      title,
      console: gameConsole,
      form: gameForm,
      price,
      description,
      photo,
    };

    try {
      const response = await axios.post<Game>(
        "https://gamesbe.adaptable.app/post",
        game,
        {
          headers: {
            authorization:  Cookies.get('GameToken'),
          },
        }
      );
      console.log("response", response);

      if (response.status === 200) {
        router.push("/");
      }
      
    } catch (err:any) {
      // if (response.status === 401) {
      //   router.push("/login");
      // }
      console.log(err)
      setBadData(err.response.data.response)
      console.log(badData)
      if(err){
        setInputFail(true)
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div>
          <div className={styles.section1}>
            <h3 className={styles.registerHeader}>Post a Game</h3>
            {inputFail ? <p className={styles.inputFail}>{badData}</p> : ""}
            <div className={styles.form}>
              <input
                className={styles.input}
                type="text"
                placeholder="Game title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <select
                id="platform"
                onChange={(event) => setGameConsole(event.target.value)}
                className={styles.formSelect}
              >
                <option value="">Choose Platform</option>
                <option value="Playstation">Playstation</option>
                <option value="Xbox">Xbox</option>
                <option value="PC">PC</option>
              </select>
              <select
                id="form"
                onChange={(event) => setGameForm(event.target.value)}
                className={styles.formSelect}
              >
                <option value="">Choose gameForm</option>
                <option value="Digital">Digital</option>
                <option value="Physical">Physical</option>
              </select>
              <input
                className={styles.input}
                type="number"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Image URL"
                value={photo}
                onChange={(event) => setPhoto(event.target.value)}
              />
              <textarea
                placeholder="Description"
                className={styles.input}
                cols={30}
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
              <button onClick={createGame} className={styles.button}>
                Submit
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
