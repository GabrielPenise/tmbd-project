import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

export default function UserCard({ usuarioCard }) {
  const { user } = useAuthContext();
  const [friends, setFriends] = useState("");
  const [boton, setBoton] = useState("");

  useEffect(() => {
    axios
      .get("/api/users/findOne/amigo", {
        params: {
          ...user,
          usuarioCard,
        },
      })
      .then((isFriend) => {
        isFriend.data ? setBoton("Delete Friend") : setBoton("Add Friend");
      });
  }, [friends]);

  const handleFriend = (e) => {
    e.preventDefault();
    axios.put("/api/users/friends", {
      ...user,
      usuarioCard,
    });
    friends ? setFriends(false) : setFriends(true);
  };

  return (
    <div>
      <div className="user-card">
        <img
          src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          alt="uknow-user"
        />
        <h2>{`${usuarioCard.name} ${usuarioCard.lastname}`}</h2>

        <br />
        <button onClick={handleFriend}>{boton}</button>
      </div>
    </div>
  );
}
