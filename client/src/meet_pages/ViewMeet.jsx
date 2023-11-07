import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./ViewMeet.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Card, Button, Modal, Form, Alert } from "react-bootstrap";

const ViewMeet = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const meetId = location.pathname.split("/")[2];

  const [edittingMode, setEdittingMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [meet, setMeet] = useState({
    name: "",
    location: "",
    date: "",
    opponent: "",
  });

  const [edittedMeet, setEdittedMeet] = useState({
    name: meet.name,
    location: "",
    date: "",
    opponent: "",
  });

  useEffect(() => {
    fetchMeet();
  }, []);

  const fetchMeet = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/meets/${meetId}`);

      setMeet(res.data[0]);
      setEdittedMeet(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => setEdittingMode(!edittingMode);

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      !edittedMeet.name ||
      !edittedMeet.location ||
      !edittedMeet.date ||
      !edittedMeet.opponent
    ) {
      setShowAlert(true);
      return;
    }

    try {
      await axios.put("http://localhost:5000/meets/" + meetId, edittedMeet);
      fetchMeet();
      setEdittingMode(false);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setEdittedMeet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setEdittingMode(false);
    setShowAlert(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/meets/" + id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className="mt-4">
        <Card className="mx-auto text-white shadow-lg">
          <Card.Body>
            <div className="d-flex">
              <Button
                variant="outline-primary"
                onClick={() => navigate("/")}
                style={{ marginRight: "10px" }}
              >
                Go Back
              </Button>
              <Button variant="success" onClick={handleEdit}>
                <i className="bi bi-pencil-square"></i>
              </Button>
            </div>
            <h1 className="mt-3 mb-3 meet-name">{meet.name}</h1>
            <section className="meet-content">
              <p>
                <b>Date: </b>
                {meet.date}
              </p>
              <p>
                <b>At: </b>
                {meet.location}
              </p>
              <p>
                <b>Against: </b>
                {meet.opponent}
              </p>
            </section>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={edittingMode} onHide={handleClose}>
        <Alert
          variant="danger"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          All fields are required!
        </Alert>
        <Modal.Header closeButton>
          <Modal.Title>Edit Meet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={handleInputChange}
                name="name"
                value={edittedMeet.name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Date"
                onChange={handleInputChange}
                name="date"
                value={edittedMeet.date}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Location"
                onChange={handleInputChange}
                name="location"
                value={edittedMeet.location}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Opponent"
                onChange={handleInputChange}
                name="opponent"
                value={edittedMeet.opponent}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={() => handleDelete(meetId)}
            style={{ marginRight: "auto" }}
          >
            <i className="bi bi-trash-fill"></i>
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            <i className="bi bi-floppy2-fill"></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewMeet;
