import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact'
import Attendance from './pages/Attendance';
import AddUser from './pages/AddUser';
import Landing from './pages/Landing';
import Leave from './pages/Leave';
import Project from './pages/Project';

function App() {
  const employeeId = localStorage.getItem("employeeId")
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Landing />} />
        <Route path='/addUser' element={<AddUser />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/user/leave' element={<Leave />} />
        <Route path="/user/attendance" element={<Attendance />} />
        <Route path="/user/project" element={<Project />} />
        <Route path="/admin/addUser" element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
