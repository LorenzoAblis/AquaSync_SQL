import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Modal, Button, Form, Alert } from "react-bootstrap";
import toast from "react-hot-toast";

const AddMeetModal = (props) => {
  const { showAddMeet, setShowAddMeet } = props;
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  const [newMeet, setNewMeet] = useState({
    name: "",
    location: "",
    date: "",
    opponent: "",
  });

  const handleClose = () => {
    setShowAddMeet(false);
    setShowAlert(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      !newMeet.name ||
      !newMeet.location ||
      !newMeet.date ||
      !newMeet.opponent
    ) {
      setShowAlert(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/meets", newMeet);
      setNewMeet({
        name: "",
        location: "",
        date: "",
        opponent: "",
      });
      navigate("/");
      handleClose();
      toast.success("Meet successfully added!");
    } catch (error) {
      toast.error(`Failed to add meet! \n\n${error}`);
    }
  };

  const handleChange = (e) => {
    setNewMeet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // TODO: Delete when done
  const handleDev = async () => {
    setNewMeet({
      name: "Test Meeting",
      location: "1234 Main St.",
      date: "2022-09-07T18:00:00Z",
      opponent: "Opponent Name",
    });

    try {
      await axios.post("http://localhost:5000/api/meets", newMeet);
      navigate("/");
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={showAddMeet} onHide={handleClose}>
        <Alert
          variant="danger"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          dismissible
        >
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
          <Button variant="outline-info" onClick={handleDev}>
            Dev
          </Button>
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

AddMeetModal.propTypes = {
  showAddMeet: PropTypes.bool.isRequired,
  setShowAddMeet: PropTypes.func.isRequired,
};

export default AddMeetModal;
