import { Card, Col, Container, Row } from "react-bootstrap";
import "./Connections.css";
import { useNavigate } from "react-router-dom";

const connectionsData = [
  {
    name: "Maria",
    event: "Techto",
    descriptionLink: "#"
  },
  {
    name: "Josina",
    event: "Techto",
    descriptionLink: "#"
  },
  {
    name: "Aayushi",
    event: "Women in Tech",
    descriptionLink: "#"
  },
  {
    name: "Aayushi",
    event: "Women in Tech",
    descriptionLink: "#"
  },
  {
    name: "Aayushi",
    event: "Women in Tech",
    descriptionLink: "#"
  },
  {
    name: "Aayushi",
    event: "Women in Tech",
    descriptionLink: "#"
  }
];

function Connections() {

    const navigate = useNavigate();

    function userProfile(){
        navigate("/userDetails")
    }

  return (
    <div>
      {/* <p className="heading">Connections</p> */}
      <Container>
        <Row>
          {connectionsData.map((connection, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{connection.name}</Card.Title>
                  <Card.Text>Event: {connection.event}</Card.Text>
                  <Card.Link onClick={userProfile}>View Description</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Connections;
