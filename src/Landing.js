import logo from "./logo.svg";
import "./Landing.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Connections from "./Connections";
import axios from "axios";
import AddConnection from "./AddConnection";

function Landing() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleForm = () => {
    navigate("/userProfile");
    
  };
   const handleKeynote = () => {
    navigate("/keynotes");
  };
  const [connections, setConnections] = useState([]);
  const [email, setEmail] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/all')
      .then(res => setConnections(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/search?email=${email}`);
      setFoundUser(res.data);
      setError('');
    } catch (err) {
      setError('User not found');
      setFoundUser(null);
    }
  };

  const handleAdd = () => {
    if (foundUser) {
      setConnections(prev => [...prev, foundUser]);
      alert('User added to your connections');
      setEmail('');
      setFoundUser(null);
    }
  };

   useEffect(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const userObj = JSON.parse(savedUser);
        setUserName(userObj.name || "User");
      }
    }, []);

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">Tap Talk AI</div>
        <div className="navbar-links">
  
        </div>
        <div className="navbar-auth">
          <Button className="buttonProfile">Profile</Button>
        </div>
      </nav>

      {/* Welcome Message */}
      <div className="welcome">
        <h1>Hello {userName}!</h1>
        <p>Have a great connected experience!</p>
      </div>
      
      {/* <div className="Keynote">
        <button onClick={handleKeynote}>Key Note</button>
      </div> */}

        <AddConnection></AddConnection>

      <Connections></Connections>

      {/* Action Links */}
      <Container className="container">
        <Row className="row">
          
          <Col className="col">
            <Button className="button1" onClick={handleKeynote}>Add Note</Button>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default Landing;
