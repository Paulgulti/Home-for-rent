import { Route, Routes } from 'react-router'
import Properties from './property/Properties'
import Signup from './auth/Signup'
import Login from './auth/Login'
// import Owner from './owner/Owner'
import Home from './Home'
import PropertyDetail from './property/PropertyDetail'
import Dashboard from './dashboard/Dashboard'
import Profile from './profile/Profile'
import Header from './Header'

function App() {

  return (
    <div className='container mx-auto'>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          {/* <Route path="/owner" element={<Owner />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="properties/:propertyId" element={<PropertyDetail />} />
          <Route path="/:profileId" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
