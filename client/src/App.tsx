import { Route, Routes } from 'react-router'
import Properties from './property/Properties'
import Signup from './auth/Signup'
import Login from './auth/Login'
import Home from './Home'
import PropertyDetail from './property/PropertyDetail'
import Profile from './profile/Profile'
import Header from './Header'
import NotFound from './NotFound'

function App() {

  return (
    <div className='container mx-auto'>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/dashboard" element={<Profile />} />
          <Route path="properties/:propertyId" element={<PropertyDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
