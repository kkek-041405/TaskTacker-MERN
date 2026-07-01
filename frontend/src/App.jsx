import { useEffect, useMemo, useState } from 'react'
import {getTasks,updateTask,deleteTask,createTask} from './services/api'
import Home from './Components/home'
import Form from './Components/form'
import Dashboard from './Components/Dashboard'




function App() {
  const [tasks, setTasks] = useState([])
  const [screen, setScreen] = useState('home')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const tasksData = await getTasks()
        console.log('Fetched tasks:', tasksData)
        setTasks(tasksData)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }

    getAllTasks()
    
  }, [updateTask, deleteTask, createTask, tasks,filter, searchTerm])

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      // console.log(task._id)
      const matchesStatus = filter === 'All' || task.status === filter
      const searchableText = `${task.title} ${task.note}`.toLowerCase()
      const matchesSearch = searchableText.includes(searchTerm.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [filter, searchTerm, tasks])

  const stats = useMemo(() => {
    const total = tasks.length
    const done = tasks.filter((task) => task.status === 'Done').length
    const inProgress = tasks.filter((task) => task.status === 'In Progress').length
    const todo = tasks.filter((task) => task.status === 'Todo').length
    const completionRate = total ? Math.round((done / total) * 100) : 0

    return { total, done, inProgress, todo, completionRate }
  }, [tasks])

  

  

  const updateTaskStatus = (taskId, status) => {
    updateTask(taskId, { status })

  }

  const removeTask = (taskId) => {
    deleteTask(taskId)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {screen === 'home' ? (
        <Home
          stats={stats}
          onGoToDashboard={() => setScreen('dashboard')}
        />
      ) : (
        <>
          <Dashboard
            stats={stats}
            removeTask={removeTask}
            updateTaskStatus={updateTaskStatus}
            visibleTasks={visibleTasks}
            filter={filter}
            setFilter={setFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddTask={() => setIsFormOpen(true)}
            setTasks={setTasks}
          />

          {isFormOpen ? (
            <Form
              setTasks={setTasks}
              onClose={() => setIsFormOpen(false)}
            />
          ) : null}
        </>
      )}
    </main>
  )
}

export default App
