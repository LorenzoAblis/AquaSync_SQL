import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Meets.css";
import AddMeet from "./AddMeetModal";
import DeleteMeetConfirmationModal from "./DeleteMeetConfirmationModal";

const Meets = () => {
  const [meets, setMeets] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [meetIdToBeDeleted, setMeetIdToBeDeleted] = useState("");

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

  const handleDelete = (id) => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
    setMeetIdToBeDeleted(id);
  };

  return (
    <>
      <Container className="d-flex flex-wrap align-items-center justify-content-center mt-2">
        <Row>
          {meets.map((meet) => (
            <Col key={meet.meet_id}>
              <Card className="text-white p-1 shadow-lg m-2">
                <Card.Body className="d-flex flex-column">
                  <div className="card-content">
                    <Card.Title>{meet.location}</Card.Title>
                    <h1>{meet.name}</h1>
                    <Card.Text>{meet.date}</Card.Text>
                  </div>
                  <div className="d-flex justify-content-between mt-auto">
                    <Link to={`/view-meet/${meet.meet_id}`}>
                      <Button variant="dark">View</Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(meet.meet_id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}

          <AddMeet></AddMeet>
          <DeleteMeetConfirmationModal
            meetId={meetIdToBeDeleted}
            setMeetId={setMeetIdToBeDeleted}
            showDeleteConfirmation={showDeleteConfirmation}
            setShowDeleteConfirmation={setShowDeleteConfirmation}
          ></DeleteMeetConfirmationModal>
        </Row>
      </Container>
    </>
  );
};

export default Meets;
