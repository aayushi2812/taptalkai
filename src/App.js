import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Tap Talk AI</h1>
      <Link to='/form'>Form</Link>
    </div>
  );
}

export default App;
