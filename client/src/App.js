import Login from './pages/login/Login.js';
import Signup from './pages/signup/Signup.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
