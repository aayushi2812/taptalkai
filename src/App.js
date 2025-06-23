import logo from "./logo.svg";
import "./App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

function App() {
  const navigate = useNavigate();

  const signUp = () => {
    navigate("/userProfile");
  };

  return (
    <div className="app-page">
      <header className="header">
        <h1>TapTalk AI</h1>
      </header>
      <div className="auth-options">
        <button className="auth-button" onClick={signUp}>Sign Up</button>
        <button className="auth-button">Sign In</button>
      </div>
    </div>
  );
}

export default App;
