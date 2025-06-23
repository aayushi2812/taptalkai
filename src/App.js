import logo from './logo.svg';
import './App.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()

  const handleForm = () => {
    navigate("/userProfile")
  }

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">Tap Talk AI</div>
        <div className="navbar-links">
          <a href="#">Home</a>
          <a href="#">Connections</a>
        </div>
        <div className="navbar-auth">
          <a href="#">Profile</a>
          <a href="#">SignIn</a>
        </div>
      </nav>

      {/* Welcome Message */}
      <div className="welcome">
        <h1>Hello Aayushi</h1>
        <p>Have a great connected experience!</p>
      </div>

      {/* Action Links */}
      <div className="action-links">
        <button href="#">Qr Scanner</button>
        <button href="#">Add User</button>
        <button onClick={handleForm}>Form</button>
      </div>

      {/* Connection Stats */}
      <div className="stats">
        <div className="stats-box">
          <h2>Connections</h2>
          <p>Today's Count</p>
        </div>

        <div className="stats-box">
          <h2>Recent Connections</h2>
          {/* Recent connections can be dynamically inserted here */}
        </div>
      </div>
    </div>
  );
}

export default App;
