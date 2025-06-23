import logo from "./logo.svg";
import "./Landing.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

function Landing() {
  const navigate = useNavigate();

  const handleForm = () => {
    navigate("/userProfile");
  };

    const handleConnections = () => {
    navigate("/connections");
  };

  const handleAddConnection = () => {
    navigate("/addConnection");
  };

  const handleQRReader = () => {
    navigate("/qrscanner");
  };

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
        <h1>Hello Aayushi</h1>
        <p>Have a great connected experience!</p>
      </div>

      {/* Action Links */}
      <Container className="container">
        <Row className="row">
          <Col className="col">
            <Button className="button1" onClick={handleAddConnection}>Add connection</Button>
          </Col>
          <Col className="col">
            <Button className="button1" onClick={handleConnections}>View Connections</Button>
          </Col>
        </Row>
      </Container>
      {/* Connection Stats */}
      {/* <div className="stats">
        <div className="stats-box">
          <h2>Connections</h2>
          <p>Today's Count</p>
        </div>

        <div className="stats-box">
          <h2>Recent Connections</h2>
        </div>
      </div> */}
    </div>
  );
}

export default Landing;
