import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./ViewMeet.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Events from "../events/EventsPage";
import AddEventModal from "../events/AddEventModal";
import EditMeetModal from "./EditMeetModal";
import { Container, Card, Button } from "react-bootstrap";



const ViewMeet = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const meetId = location.pathname.split("/")[2];

  const [showEditMeetModal, setShowEditMeetModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const [meet, setMeet] = useState({
    name: "",
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setShowEditMeetModal(!showEditMeetModal);
    fetchMeet();
  };
  const handleAdd = () => setShowAddEventModal(!showAddEventModal);

  return (
    <>
      <Container className="mt-4 w-50">
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

            <div className="mt-5 mb-3 d-flex">
              <h3 style={{ marginRight: "10px" }}>Events</h3>
              <Button variant="success" onClick={handleAdd}>
                <i className="bi bi-plus-square"></i>
              </Button>
            </div>
            <Events meetId={meetId}></Events>
          </Card.Body>
        </Card>
      </Container>

      <EditMeetModal
        meet={meet}
        showEditMeetModal={showEditMeetModal}
        setShowEditMeetModal={setShowEditMeetModal}
        fetchMeet={fetchMeet}
      ></EditMeetModal>

      <AddEventModal
        meetId={meetId}
        showAddEventModal={showAddEventModal}
        setShowAddEventModal={setShowAddEventModal}
      ></AddEventModal>
    </>
  );
};

export default ViewMeet;
