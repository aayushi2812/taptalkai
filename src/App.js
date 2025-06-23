import logo from './logo.svg';
import './App.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()

  const handleForm = () => {
    navigate("/form")
  }

  return (
    <div className="App">
      <h1>Tap Talk AI</h1>
      <button onClick={handleForm}>Form</button>
    </div>
  );
}

export default App;
