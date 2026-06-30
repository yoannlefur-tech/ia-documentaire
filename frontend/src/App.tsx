import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import DocumentPage from './pages/DocumentPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<DocumentPage />} />
    </Routes>
  )
}

export default App
