import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <Link to="/" className="logo">
            Rogue<span>Workers</span>
          </Link>
          <nav>
            <Link to="/login" className="btn-outline">Log in</Link>
            <Link to="/register" className="btn-primary">Sign up</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; {new Date().getFullYear()} Rogue Workers. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
