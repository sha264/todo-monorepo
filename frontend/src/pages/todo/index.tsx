// index.tsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

type FormData = {
  title: string
  memo: string
  priority: string
}

const Index = () => {
  const [todos, setTodos] = useState([])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:4989/todo/')
    setTodos(response.data.sort((a, b) => b.priority - a.priority))
  }

  const onSubmit = async (data: FormData) => {
    await axios.post('http://localhost:4989/todo/', data)
    fetchTodos()
    setValue('title', '')
    setValue('memo', '')
    setValue('priority', '')
  }

  const deleteTodo = async (id: number) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      await axios.delete(`http://localhost:4989/todo/${id}`)
      fetchTodos()
    }
  }

  const updateTodo = async (
    id: number,
    newTitle: string,
    newMemo: string,
    newPriority: string,
  ) => {
    await axios.put(`http://localhost:4989/todo/${id}`, {
      title: newTitle,
      memo: newMemo,
      priority: newPriority,
    })
    fetchTodos()
  }

  return (
    <div className="flex justify-center">
      <div className="px-2">
        <h1 className="mb-4 text-4xl font-bold">Todo App</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex justify-between">
            <div className="text-red-500">
              <input
                className=" border p-2"
                placeholder="Title"
                {...register('title', {
                  required: 'タイトルは必須です。',
                  maxLength: {
                    value: 20,
                    message: 'タイトルは20文字以下で入力してください。',
                  },
                })}
              />
            </div>
            <div className="text-red-500">
              <input
                className="border p-2"
                placeholder="Priority"
                type="number"
                {...register('priority', {
                  required: '優先度を入力してください。',
                  min: {
                    value: 1,
                    message: '優先度は1以上の整数で入力してください。',
                  },
                  max: {
                    value: 100,
                    message: '優先度は100以下の整数で入力してください。',
                  },
                })}
              />
            </div>
            <div>
              <input
                className="border p-2"
                placeholder="Memo"
                {...register('memo')}
              />
            </div>
            <div>
              <button
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white"
                type="submit"
              >
                Add Todo
              </button>
            </div>
          </div>
          <div>
            <p className="text-red-500">
              {errors.title && <p>{errors.title.message}</p>}
              {errors.priority && <p>{errors.priority.message}</p>}
            </p>
          </div>
        </form>

        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-2 py-2">Title</th>

              <th className="border px-2 py-2">Priority</th>
              <th className="border px-2 py-2">Memo</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {todos.map(todo => (
              <tr key={todo.id} className="">
                <td className="border px-2 py-2 text-center">{todo.title}</td>

                <td className="border px-2 py-2 text-center">
                  {todo.priority}
                </td>
                <td className="border px-2 py-2 ">{todo.memo}</td>
                <td className="border px-2 py-2 text-center">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="mr-2 rounded bg-red-500 py-1 font-bold text-white"
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
                    className="mr-2 rounded bg-green-500 py-1 font-bold text-white"
                  >
                    Update
                  </button>
                  <button className="rounded bg-white py-1 font-bold text-white">
                    <Link href={`/todo/${todo.id}`}>Edit</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Index
