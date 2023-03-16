import { useEffect, useState } from 'react'
import axios from 'axios'
const URL = 'http://localhost:4989/todo/list/1'
//todoの型を定義
type Todo = {
  id: number
  title: string
  memo: string
  priority: number
  created_at: string
  updated_at: string
}

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    axios
      .get(URL)
      .then(res => {
        setTodos(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="w-full bg-white">
      <div>Todo</div>
      <div>
        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <div>{todo.title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Todo
