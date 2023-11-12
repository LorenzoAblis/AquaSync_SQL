import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";

import DeleteEventConfirmationModal from "./DeleteEventConfirmationModal";
import { Modal, Alert, Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";

const EditEventModal = (props) => {
  const {
    selectedEvent,
    showEditEventModal,
    setShowEditEventModal,
    fetchEvents,
  } = props;

  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventIdToBeDeleted, setEventIdToBeDeleted] = useState("");

  const [edittedEvent, setEdittedEvent] = useState({
    stroke: "",
    distance: 0,
    time: "",
  });

  const handleClose = () => {
    setShowEditEventModal(false);
  };

  const handleInputChange = (e) => {
    setEdittedEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = (id) => {
    setShowDeleteConfirmation(true);
    setShowEditEventModal(false);
    setEventIdToBeDeleted(id);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!edittedEvent.stroke || !edittedEvent.distance || !edittedEvent.time) {
      setShowAlert(true);
      return;
    }

    try {
      await axios.put(
        "http://localhost:5000/api/events/" + selectedEvent.event_id,
        edittedEvent
      );
      fetchEvents();
      setShowEditEventModal(false);
      handleClose();
      toast.success("Meet successfully edited!");
    } catch (error) {
      toast.error(`Failed to edit event! \n\n${error}`);
    }
  };

  useEffect(() => {
    setEdittedEvent({
      stroke: selectedEvent.stroke,
      distance: selectedEvent.distance,
      time: selectedEvent.time,
    });
  }, [selectedEvent]);

  return (
    <>
      <Modal show={showEditEventModal} onHide={handleClose}>
        <Alert
          variant="danger"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          All fields are required!
        </Alert>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Stroke"
                onChange={handleInputChange}
                name="stroke"
                value={edittedEvent.stroke}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Distance"
                onChange={handleInputChange}
                name="distance"
                value={edittedEvent.distance}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Time"
                onChange={handleInputChange}
                name="time"
                value={edittedEvent.time}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={() => handleDelete(selectedEvent.event_id)}
            style={{ marginRight: "auto" }}
          >
            <i className="bi bi-trash-fill"></i>
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <DeleteEventConfirmationModal
        eventIdToBeDeleted={eventIdToBeDeleted}
        setEventIdToBeDeleted={setEventIdToBeDeleted}
        showDeleteConfirmation={showDeleteConfirmation}
        setShowDeleteConfirmation={setShowDeleteConfirmation}
        fetchEvents={fetchEvents}
      />
    </>
  );
};

EditEventModal.propTypes = {
  selectedEvent: PropTypes.object.isRequired,
  showEditEventModal: PropTypes.bool.isRequired,
  setShowEditEventModal: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
};

export default EditEventModal;
