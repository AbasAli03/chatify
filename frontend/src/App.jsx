import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import Home from './components/home/Home.jsx';
import "./app.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
