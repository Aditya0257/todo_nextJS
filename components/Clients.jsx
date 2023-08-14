"use client";

import Link from "next/link";
import { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import '../styles/app.scss';

import { Toaster, toast } from "react-hot-toast";
import RefreshIcon from "@mui/icons-material/Refresh";

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        } else {
          console.log("no user data yet, should login!");
        }
      })
      .catch((error) => {
        console.log(error);
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

const RefreshBtn = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
    return toast.success("refreshing tasks...");
  }
  return (
    <div className="refreshButton">
      <RefreshIcon
        className="refreshIcon"
        onClick={() => handleRefresh()}
      />
    </div>
  );
};

export default RefreshBtn;
