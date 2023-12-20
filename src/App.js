import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ViewAllOpals from './pages/ViewAllOpals';
import ViewAllUsers from './pages/ViewAllUsers';
import EditOpal from './pages/EditOpal';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';
import ExampleComponent from './pages/ExampleComponent';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <NavBar />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/example" element={<ExampleComponent />} />
          <Route path="/protected" element={<ProtectedRoute />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/opals" element={<ViewAllOpals />} />
          <Route path="/edit-opal/:opal_id" element={<EditOpal />} />
          <Route path="/users" element={<ViewAllUsers />} />
        </Routes> 

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;