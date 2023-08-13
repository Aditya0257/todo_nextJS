import React, { Suspense } from "react";
import Form from "./addTodoForm";
import Todos from "./todos";

const page =  () => {
  
  return (
    <div className="container">
      <Form />
      <Suspense fallback = {<div>Loading...</div>}> 
      <Todos />
      </Suspense> {/* Suspense is for handling asynchronous function calls at server side with a fallback */}
       
      
    </div>
  );
};

export default page;
