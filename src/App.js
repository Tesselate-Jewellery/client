import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import ViewAllOpals from './pages/ViewAllOpals';
import ViewAllUsers from './pages/ViewAllUsers';
import ViewAllQuotes from './pages/ViewAllQuotes';
import EditUser from './pages/EditProfile';
import EditOpal from './pages/EditOpal';
import CreateNewOpal from './pages/CreateNewOpal';
import Gallery from './pages/Gallery';
import BrowseOpal from './pages/BrowseOpal';
import QuotePage from './pages/QuotePage';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/opals" element={<ViewAllOpals />} />
          <Route path="/edit-opal/:opal_id" element={<EditOpal />} />
          <Route path="/create-new-opal" element={<CreateNewOpal />} />
          <Route path="/users" element={<ViewAllUsers />} />
          <Route path="/edit-profile/:user_id" element={<EditUser />} />
          <Route path="/quotes" element={<ViewAllQuotes />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/browse-opal/:opal_id" element={<BrowseOpal />} />
          <Route path="/thank-you/:calculatedPrice/:opalName" element={<QuotePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
        </Routes> 

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;