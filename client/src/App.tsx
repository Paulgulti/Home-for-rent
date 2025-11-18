import { Route, Routes } from 'react-router'
import Home from './Home'
import Signup from './auth/Signup'
import Login from './auth/Login'
import Header from './Header'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
