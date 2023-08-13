"use client";

import { Context } from "@/components/Clients";
import { Avatar } from "@mui/material";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

const ProfileCard = () => {
  const { user } = useContext(Context);
  if (!user._id) return redirect("/login");
  return (
    <div className="profile">
      <div className="profile__card">
        <div className="profile__details">
          <h1>Name : {user.name}</h1>
          <h2>Email : {user.email}</h2>
        </div>

        <Avatar sx={{ width: 128, height: 128, marginLeft: 10 }} />
      </div>
    </div>
  );
};

export default ProfileCard;
