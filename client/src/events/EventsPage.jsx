import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";

import { ListGroup } from "react-bootstrap";

const Events = (props) => {
  const { meetId } = props;

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/events/${meetId}`);

      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ListGroup>
        {events.map((event) => (
          <ListGroup.Item key={event.event_id}>
            {event.stroke}, {event.distance}, {event.time}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

Events.propTypes = {
  meetId: PropTypes.string.isRequired,
};

export default Events;
