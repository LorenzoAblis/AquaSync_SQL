import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";

const DeleteMeetConfirmationModal = (props) => {
  const {
    meetId,
    setMeetId,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  } = props;

  const navigate = useNavigate();

  const handleCancel = () => {
    setShowDeleteConfirmation(false);
    setMeetId("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/api/meets/" + id);
      setShowDeleteConfirmation(false);
      setMeetId("");
      navigate("/");
      toast.success("Meet successfully deleted!");
    } catch (error) {
      toast.error(`Failed to delete meet! \n\n${error}`);
    }
  };

  return (
    <>
      <Modal show={showDeleteConfirmation} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Meet</Modal.Title>
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
          <Button variant="outline-danger" onClick={() => handleDelete(meetId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DeleteMeetConfirmationModal.propTypes = {
  meetId: PropTypes.string.isRequired,
  setMeetId: PropTypes.func.isRequired,
  showDeleteConfirmation: PropTypes.bool.isRequired,
  setShowDeleteConfirmation: PropTypes.func.isRequired,
};

export default DeleteMeetConfirmationModal;
