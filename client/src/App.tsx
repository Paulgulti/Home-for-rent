import { Route, Routes } from 'react-router'
import Home from './Home'
import Signup from './auth/Signup'
import Login from './auth/Login'
import Header from './Header'
import Owner from './owner/Owner'

function App() {

  return (
    <div className='container mx-auto'>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/dashboard"/>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
