import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";

import DeleteMeetConfirmationModal from "./DeleteMeetConfirmationModal";
import { Modal, Alert, Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";

const EditMeetModal = (props) => {
  const { meet, showEditMeetModal, setShowEditMeetModal, fetchMeet } = props;

  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [meetIdToBeDeleted, setMeetIdToBeDeleted] = useState("");

  const [edittedMeet, setEdittedMeet] = useState({
    name: "",
    location: "",
    date: "",
    opponent: "",
  });

  const handleClose = () => {
    setShowEditMeetModal(false);
    setShowAlert(false);
  };

  const handleInputChange = (e) => {
    setEdittedMeet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = (id) => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
    setShowEditMeetModal(false);
    setMeetIdToBeDeleted(id);
  };

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
      await axios.put(
        "http://localhost:5000/api/meets/" + meet.meet_id,
        edittedMeet
      );
      fetchMeet();
      setShowEditMeetModal(false);
      handleClose();
      toast.success("Meet successfully edited!");
    } catch (error) {
      toast.error(`Failed to edit meet! \n\n${error}`);
    }
  };

  useEffect(() => {
    setEdittedMeet({
      name: meet.name,
      location: meet.location,
      date: meet.date,
      opponent: meet.opponent,
    });
  }, [meet]);

  return (
    <>
      <Modal show={showEditMeetModal} onHide={handleClose}>
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
            onClick={() => handleDelete(meet.meet_id)}
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

      <DeleteMeetConfirmationModal
        meetId={meetIdToBeDeleted}
        setMeetId={setMeetIdToBeDeleted}
        showDeleteConfirmation={showDeleteConfirmation}
        setShowDeleteConfirmation={setShowDeleteConfirmation}
      />
    </>
  );
};

EditMeetModal.propTypes = {
  meet: PropTypes.object.isRequired,
  showEditMeetModal: PropTypes.bool.isRequired,
  setShowEditMeetModal: PropTypes.func.isRequired,
  fetchMeet: PropTypes.func.isRequired,
};

export default EditMeetModal;
