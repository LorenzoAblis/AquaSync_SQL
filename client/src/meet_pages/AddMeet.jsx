import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMeet = () => {
  const [showModal, setShowModal] = useState(false);
  const [newMeet, setNewMeet] = useState({
    name: "",
    location: "",
    date: "",
    opponent: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
    setShowAlert(false);
  };

  const handleShow = () => setShowModal(true);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!newMeet.name || !newMeet.location || !newMeet.date || !newMeet.opponent) {
      setShowAlert(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/meets", newMeet);
      setNewMeet({
        name: "",
        location: "",
        date: "",
        opponent: "",
      });
      navigate("/");
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setNewMeet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Meet
      </Button>

      <Modal show={showModal} onHide={handleClose}>
      <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
        All fields are required!
      </Alert>
        <Modal.Header closeButton>
          <Modal.Title>Add Meet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={handleChange}
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Location"
                onChange={handleChange}
                name="location"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Date"
                onChange={handleChange}
                name="date"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Opponent"
                onChange={handleChange}
                name="opponent"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
};

export default AddMeet;

