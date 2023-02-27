import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const changePassword = () => {
    axios.put(
      "https://full-stack-follow-through.herokuapp.com//auth/changepassword",
      { oldPassword: oldPassword, newPassword: newPassword },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then ((response) => {
        if (response.data.error) {
            alert(response.data.error)
        }
    })
  };

  return (
    <div>
      <h1>Change your password</h1>
      <input
        type="password"
        placeholder="Old password..."
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      ></input>
      <input
        type="password"
        placeholder="New password..."
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      ></input>
      <button onClick={changePassword}>Save changes</button>
    </div>
  );
}

export default ChangePassword;
