
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from "./components/Navbar";
import CreatePost from "./components/CreatePost";
import Signup from "./components/Auth/Signup";
import { Login } from "./components/Auth/Login";
import ProfilePage from "./components/ProfilePage";
import PostPage from "./components/PostPage";
function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/new-post' element={<CreatePost/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/user/:username' element={<ProfilePage/>}/>
        <Route path="/post/:postId" element={<PostPage />} />
      </Routes>
    </Router>
  )
}

export default App
