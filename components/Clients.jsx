"use client";

import Link from "next/link";
import { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Toaster, toast } from "react-hot-toast";

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   async function fetchUserData() {
  //     try {
  //       const res = await fetch("/api/auth/me");
  //       const data = await res.json(); // taking JSON as input and parsing it to produce a JavaScript object.

  //       if (data.success) {
  //         setUser(data.user);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       return toast.error(error);
  //     }
  //   }

  //   fetchUserData();
  // }, []);
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser({});
      toast.success(data.message);
      // if (!user._id) return redirect("/login");
    } catch (error) {
      console.error(error);
      return toast.error(error);
    }
  };

  return user._id ? (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  ) : (
    <Link href="/login">Login</Link>
  );
};

export const TodoBtn = ({ id, completed }) => {
  const router = useRouter();
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
      return;
    } catch (error) {
      return toast.error(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, { method: "PUT" });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
      return;
    } catch (error) {
      return toast.error(error);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => handleUpdate(id)}
      />
      <button className="btn" onClick={() => handleDelete(id)}>
        Delete
      </button>
    </>
  );
};
