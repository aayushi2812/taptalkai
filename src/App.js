import logo from "./logo.svg";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

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
        <Button className="auth-button" onClick={signUp}>Sign Up</Button>
        <Button className="auth-button">Sign In</Button>
      </div>
    </div>
  );
}

export default App;
