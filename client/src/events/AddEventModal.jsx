import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

import { Modal, Alert, Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";

const AddEventModal = (props) => {
  const { meetId, showAddEventModal, setShowAddEventModal, fetchEvents } =
    props;

  const [showAlert, setShowAlert] = useState(false);

  const [newEvent, setNewEvent] = useState({
    meet_id: meetId,
    stroke: "",
    distance: 0,
    time: "",
  });

  const handleClose = () => {
    setShowAddEventModal(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!newEvent.stroke || !newEvent.distance || !newEvent.time) {
      setShowAlert(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/events", newEvent);
      toast.success("Event successfully added!");
      fetchEvents();
      setShowAddEventModal(false);
      handleClose();
    } catch (error) {
      toast.error(`Failed to add event! \n\n${error}`);
    }
  };

  const handleInputChange = (e) => {
    setNewEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Modal show={showAddEventModal} onHide={handleClose}>
        <Alert
          variant="danger"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          All fields are required!
        </Alert>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Stroke"
                onChange={handleInputChange}
                name="stroke"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Distance"
                onChange={handleInputChange}
                name="distance"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Time"
                onChange={handleInputChange}
                name="time"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddEventModal.propTypes = {
  meetId: PropTypes.string.isRequired,
  showAddEventModal: PropTypes.bool.isRequired,
  setShowAddEventModal: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
};

export default AddEventModal;
