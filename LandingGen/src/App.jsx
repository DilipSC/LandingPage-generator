import { useState } from 'react'
import './App.css'
import NavbarForm from './components/NavbarForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavbarForm/>
    </>
  )
}

export default App
