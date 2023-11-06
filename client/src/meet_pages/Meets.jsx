import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Meets.css";
import AddMeet from "./AddMeet";

const Meets = () => {
  const [meets, setMeets] = useState([]);

  useEffect(() => {
    const fetchAllMeets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/meets");
        setMeets(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllMeets();
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/meets/" + id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className="d-flex flex-row align-items-center justify-content-center mt-2">
        <Row className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {meets.map((meet) => (
            <Col key={meet.id}>
              <Card className="text-white p-1 shadow-lg m-2">
                <Card.Body className="d-flex flex-column">
                  <div className="card-content">
                    <Card.Title>{meet.location}</Card.Title>
                    <h1>{meet.name}</h1>
                    <Card.Text>{meet.date}</Card.Text>
                  </div>
                  <div className="d-flex justify-content-between mt-auto">
                    <Link to={`/view-meet/${meet.id}`}>
                      <Button variant="dark">View</Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(meet.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <AddMeet></AddMeet>
          
        </Row>
      </Container>
    </>
  );
};

export default Meets;
