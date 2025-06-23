import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./Connections.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AddConnection() {
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

  return (
    <div>
      <h2>Connections</h2>

      <div style={{ marginBottom: '20px' }}>
        <h4>Add Connection by Email</h4>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {foundUser && (
          <div style={{ marginTop: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <p><strong>Name:</strong> {foundUser.name}</p>
            <p><strong>Event:</strong> {foundUser.event}</p>
            <p><strong>LinkedIn:</strong> <a href={foundUser.linkedin} target="_blank" rel="noreferrer">Profile</a></p>
            <button onClick={handleAdd}>Add to My Connections</button>
          </div>
        )}
      </div>

      <Container>
        <Row>
          {connections.map((connection, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{connection.name}</Card.Title>
                  <Card.Text>
                    Event: {connection.event}
                  </Card.Text>
                  <Card.Link href={connection.linkedin}>View Description</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default AddConnection;
