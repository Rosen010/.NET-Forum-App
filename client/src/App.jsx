import { Route, Routes } from "react-router-dom"
import Navigation from "./components/navigation/Navigation"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Home from "./components/home/Home"
import Logout from "./components/logout/Logout"
import Footer from "./components/footer/Footer"
import PostCreate from "./components/postCreate/PostCreate"
import PostDetails from "./components/postDetails/PostDetails"
import PostEdit from "./components/postEdit/PostEdit"
import Profile from "./components/profile/Profile"
import GuestRoute from "./components/routeGuards/GuestRoute"
import ProtectedRoute from "./components/routeGuards/ProtectedRoute"

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navigation />
        <Routes>
          {/* Public route - accessible to everyone */}
          <Route path="/" element={<Home />} />
          
          {/* Guest routes - only accessible when NOT logged in */}
          <Route 
            path="/login" 
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            } 
          />
          
          {/* Protected routes - only accessible when logged in */}
          <Route 
            path="/logout" 
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-post" 
            element={
              <ProtectedRoute>
                <PostCreate />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/posts/:postId/edit" 
            element={
              <ProtectedRoute>
                <PostEdit />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Public route - accessible to everyone */}
          <Route path="/posts/:postId" element={<PostDetails />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
