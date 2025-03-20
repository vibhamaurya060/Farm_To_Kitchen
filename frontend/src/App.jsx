
import { Route, Routes } from 'react-router'
import './App.css'
import Signup from './Pages/Signup'
import Login from './pages/Login'
import Home from './Pages/Home'
import Navbar from './components/Navbar'


function App() {

  return (
    <>
      {/* <p>Frontend</p> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>

  )
}

export default App
