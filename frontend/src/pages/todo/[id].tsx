import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

type FormData = {
  title: string
  memo: string
  priority: string
}

const EditTodo = () => {
  const [todo, setTodo] = useState(null)
  const { register, handleSubmit, setValue } = useForm<FormData>()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    fetchTodo()
  }, [id])

  const fetchTodo = async () => {
    if (id) {
      const response = await axios.get(`http://localhost:4989/todo/${id}`)
      setTodo(response.data)
      setValue('title', response.data.title)
      setValue('memo', response.data.memo)
      setValue('priority', response.data.priority)
    }
  }

  const onSubmit = async (data: FormData) => {
    await axios.put(`http://localhost:4989/todo/${id}`, data)
    router.push('/todo/')
  }

  return (
    <div className="flex justify-center">
      <div className="px-4">
        <h1 className="mb-4 text-4xl font-bold">Edit Todo</h1>
        {todo && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="mr-2 border p-2"
              placeholder="Title"
              {...register('title', { required: true })}
            />

            <input
              className="mr-2 border p-2"
              placeholder="Priority"
              type="number"
              {...register('priority', { required: true })}
            />
            <input
              className="mr-2 border p-2"
              placeholder="Memo"
              {...register('memo', { required: true })}
            />
            <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white"
              type="submit"
            >
              Update
            </button>
          </form>
        )}
        <div>
          <p>
            created at: {todo && new Date(todo.created_at).toLocaleString()}
          </p>
          <p>
            last updated at:{' '}
            {todo && new Date(todo.updated_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EditTodo
