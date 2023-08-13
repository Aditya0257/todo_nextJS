import { TodoItem } from "@/components/ServerComponents";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const fetchTodo = async (token) => {
    try {
      const res = await fetch(`${process.env.URL}/api/mytask`, { // server component, so we start api url with process.env
        cache: "no-cache", // SSR
        headers: {
          cookie: `auth_token=${token}`, // for checking credentials at server side, here useContext wont work, as it is for client side components in react code
        },
      });
  
      const data = await res.json();
      if (!data.success) return [];
      return data.tasks;
    } catch (error) {
      console.log(error.message); // here, cant use toast, since it is server component, toast is for client side components
      return [];
    }
  };


const Todos = async () => {
  const authToken = cookies().get("auth_token");
  // console.log(authToken);
  /* authToken will look like this ->
  {
    name: 'auth_token',
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eghmaWQiOiI2NGQ1ZmIzYjZkNDgyZmU2OWI0MWIxYzQiLCJpYXQiOjE2OTE3NzQ5NzF9.LyEUijCXDGZWiE7B-9VdQ0xrrsGvLOyl4Mejhkyr02I'
  }
  */
  const token = authToken?.value;
  if (!token) return redirect("/login");
  const tasks = await fetchTodo(token);

  return (
    <section className="todosContainer">
      {tasks?.map((task) => (
        <TodoItem
          key={task._id}
          title={task.title}
          description={task.description}
          id={task._id}
          completed={task.isCompleted}
        ></TodoItem>
      ))}
    </section>
  );
};

export default Todos;
