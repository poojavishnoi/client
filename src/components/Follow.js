import React, { useState } from "react";
import { useAuth } from "../context/auth-context";

function Follow({ followUser }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { dispatch } = useAuth();
  const [showFollow, setShowFollow] = useState(
    currentUser ? !currentUser.following.includes(followUser._id) : true
  );

  const followUserHandler = (id) => {
    console.log(id);
    fetch("http://localhost:5000/api/user/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, follower: data.follower },
        });
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  };

  const unFollowUserHandler = (id) => {
    fetch("http://localhost:5000/api/user/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, follower: data.follower },
        });
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="follow_person">
      <img className="profile_img" src={followUser.pic} alt=""></img>
      <div className="profile_name">
        <span className="fullname">{followUser.name}</span>
        <div className="username">{followUser.email}</div>
      </div>
      {showFollow ? (
        <button
          onClick={() => {
            followUserHandler(followUser._id);
            setShowFollow(!showFollow);
          }}
          className="flw_btn"
        >
          Follow
        </button>
      ) : (
        <button
          onClick={() => {
            unFollowUserHandler(followUser._id);
            setShowFollow(!showFollow);
          }}
          className="flw_btn"
        >
          Unfollow
        </button>
      )}
    </div>
  );
}

export default Follow;
