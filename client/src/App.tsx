import { Route, Routes } from 'react-router'
import Properties from './Properties'
import Signup from './auth/Signup'
import Login from './auth/Login'
import Header from './Header'
import Owner from './owner/Owner'
import Home from './Home'
import PropertyDetail from './property/PropertyDetail'

function App() {

  return (
    <div className='container mx-auto'>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/dashboard" />
          <Route path="properties/:propertyId" element={<PropertyDetail />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
