import PropTypes from "prop-types";
import axios from "axios";

import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";

const DeleteEventConfirmationModal = (props) => {
  const {
    eventIdToBeDeleted,
    setEventIdToBeDeleted,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    fetchEvents,
  } = props;

  const handleCancel = () => {
    setShowDeleteConfirmation(false);
    setEventIdToBeDeleted("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/events/" + id);
      setShowDeleteConfirmation(false);
      setEventIdToBeDeleted("");
      fetchEvents();
      toast.success("Event successfully deleted!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={showDeleteConfirmation} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this meet? This action is
          <br />
          <strong>irreversible</strong>.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => handleDelete(eventIdToBeDeleted)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DeleteEventConfirmationModal.propTypes = {
  eventIdToBeDeleted: PropTypes.string.isRequired,
  setEventIdToBeDeleted: PropTypes.func.isRequired,
  showDeleteConfirmation: PropTypes.bool.isRequired,
  setShowDeleteConfirmation: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
};

export default DeleteEventConfirmationModal;
