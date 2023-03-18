import { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const Index = () => {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [memo, setMemo] = useState('')
  const [priority, setPriority] = useState('')
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:4989/todo/')
    setTodos(response.data)
  }

  const addTodo = async () => {
    await axios.post('http://localhost:4989/todo/', { title, memo, priority })
    fetchTodos()
    setTitle('')
    setMemo('')
    setPriority('')
  }

  const deleteTodo = async id => {
    await axios.delete(`http://localhost:4989/todo/${id}`)
    fetchTodos()
  }

  const updateTodo = async (id, newTitle, newMemo, newPriority) => {
    await axios.put(`http://localhost:4989/todo/${id}`, {
      title: newTitle,
      memo: newMemo,
      priority: newPriority,
    })
    fetchTodos()
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-4 text-4xl font-bold">Todo App</h1>
      <div className="mb-4">
        <input
          className="mr-2 border p-2"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="mr-2 border p-2"
          placeholder="Memo"
          value={memo}
          onChange={e => setMemo(e.target.value)}
        />
        <input
          className="mr-2 border p-2"
          placeholder="Priority"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        />
        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Memo</th>
            <th className="border px-4 py-2">Priority</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {todos.map(todo => (
            <tr key={todo.id} className="">
              <td className="border px-4 py-2 text-center">{todo.title}</td>
              <td className="border px-4 py-2 text-center">{todo.memo}</td>
              <td className="border px-4 py-2 text-center">{todo.priority}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="mr-2 rounded bg-red-500 py-1 px-2 font-bold text-white"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    updateTodo(
                      todo.id,
                      prompt('Enter new title:', todo.title),
                      prompt('Enter new memo:', todo.memo),
                      prompt('Enter new priority:', todo.priority),
                    )
                  }
                  className="rounded bg-green-500 py-1 px-2 font-bold text-white"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Index
