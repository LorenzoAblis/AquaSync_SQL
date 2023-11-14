import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Meets.css";
import AddMeetModal from "./AddMeetModal";
import DeleteMeetConfirmationModal from "./DeleteMeetConfirmationModal";
import { Card, Button, Container, Form } from "react-bootstrap";

const Meets = () => {
  const [meets, setMeets] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddMeet, setShowAddMeet] = useState(false);
  const [meetIdToBeDeleted, setMeetIdToBeDeleted] = useState("");

  const handleDelete = (id) => {
    setShowDeleteConfirmation(true);
    setMeetIdToBeDeleted(id);
  };

  useEffect(() => {
    const fetchAllMeets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/meets");
        setMeets(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllMeets();
  });

  return (
    <>
      <Container className="mt-3">
        <div className="d-flex flex-column w-100 mb-2">
          <h1 className="text-white meets-title">Meets</h1>
          <div className="p-2">
            <Button
              variant="success"
              className="rounded-circle shadow-lg"
              onClick={() => setShowAddMeet(true)}
            >
              <i className="bi bi-plus-circle add-button"></i>
            </Button>
            <Button
              variant="secondary"
              style={{ marginLeft: "10px" }}
              className="shadow-lg"
            >
              <i className="bi bi-funnel filter-button"></i>
            </Button>
            <Form
              className="form-check-inline w-25 shadow-lg"
              style={{ marginLeft: "15px" }}
            >
              <Form.Control placeholder="Search" />
            </Form>
          </div>
        </div>

        <section className="d-flex flex-wrap justify-content-md-start">
          {meets.map((meet) => (
            <Card key={meet.meet_id} className="text-white p-1 shadow-lg m-2">
              <Card.Body className="d-flex flex-column">
                <div>
                  <Card.Title>{meet.location}</Card.Title>
                  <h1>{meet.name}</h1>
                  <h5>{meet.date}</h5>
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
          ))}
        </section>
      </Container>

      <AddMeetModal showAddMeet={showAddMeet} setShowAddMeet={setShowAddMeet} />

      <DeleteMeetConfirmationModal
        meetId={meetIdToBeDeleted}
        setMeetId={setMeetIdToBeDeleted}
        showDeleteConfirmation={showDeleteConfirmation}
        setShowDeleteConfirmation={setShowDeleteConfirmation}
      />
    </>
  );
};

export default Meets;
