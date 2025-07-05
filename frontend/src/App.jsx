
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from "./components/Navbar";
import CreatePost from "./components/CreatePost";
import Auth from "./components/Auth/Auth";
import ProfilePage from "./components/ProfilePage";
function App() {


  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/new-post' element={<CreatePost/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </Router>
  )
}

export default App
