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

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/create-post" element={<PostCreate />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/posts/:postId/edit" element={<PostEdit />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
