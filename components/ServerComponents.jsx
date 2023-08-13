import React from 'react'
import { TodoBtn } from './Clients'

export const TodoItem = ({ id, title, description, completed }) => {
  return (
    <div className="todo">
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div>
          <TodoBtn id={id} completed={completed}/>
        </div>
    </div>
  )
}
