import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./ViewMeet.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditMeetModal from "./EditMeetModal";
import AddEventModal from "../events/AddEventModal";
import EditEventModal from "../events/EditEventModal";
import { Container, Card, Button, ListGroup } from "react-bootstrap";
import toast from "react-hot-toast";

const ViewMeet = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const meetId = location.pathname.split("/")[2];

  const [events, setEvents] = useState([]);

  const [showEditMeetModal, setShowEditMeetModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);

  const [meet, setMeet] = useState({
    name: "",
    location: "",
    date: "",
    opponent: "",
  });

  const [selectedEvent, setSelectedEvent] = useState({
    event_id: "",
    stroke: "",
    distance: 0,
    time: "",
  });

  const fetchMeet = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/meets/${meetId}`);
      setMeet(res.data[0]);
    } catch (error) {
      toast.error(`Failed to fetch meet!\n\n${error}`);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/events/${meetId}`);
      setEvents(res.data);
    } catch (error) {
      toast.error(`Failed to fetch events!\n\n${error}`);
    }
  };

  const handleEditMeet = () => {
    setShowEditMeetModal(true);
    fetchMeet();
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEditEventModal(true);
  };

  const handleAddEvent = () => setShowAddEventModal(true);

  useEffect(() => {
    fetchMeet();
    fetchEvents();
  }, []);

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
              <Button variant="success" onClick={handleEditMeet}>
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
              <Button variant="success" onClick={handleAddEvent}>
                <i className="bi bi-plus-square"></i>
              </Button>
            </div>

            <ListGroup className="">
              {events.map((event) => (
                <ListGroup.Item key={event.event_id}>
                  <div className="d-flex flex-row justify-content-between mt-2">
                    <h5 className="w-50">
                      <strong>
                        {event.distance}m {event.stroke}
                      </strong>
                    </h5>
                    <div className="d-flex flex-row justify-content-between w-50">
                      <p>{event.time}</p>
                      <Button
                        variant="success"
                        onClick={() => handleEditEvent(event)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>

      <EditMeetModal
        meet={meet}
        showEditMeetModal={showEditMeetModal}
        setShowEditMeetModal={setShowEditMeetModal}
        fetchMeet={fetchMeet}
      />

      <AddEventModal
        meetId={meetId}
        showAddEventModal={showAddEventModal}
        setShowAddEventModal={setShowAddEventModal}
        fetchEvents={fetchEvents}
      />

      <EditEventModal
        selectedEvent={selectedEvent}
        showEditEventModal={showEditEventModal}
        setShowEditEventModal={setShowEditEventModal}
        fetchEvents={fetchEvents}
      />
    </>
  );
};

export default ViewMeet;
