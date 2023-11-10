import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";

import { ListGroup, Button } from "react-bootstrap";

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
      <ListGroup className="">
        {events.map((event) => (
          <ListGroup.Item key={event.event_id}>
            <div className="d-flex flex-row justify-content-between">
              <h5 className="mt-2 w-50">
                <strong>
                  {event.distance}m {event.stroke}
                </strong>
              </h5>
              <div className="d-flex flex-row justify-content-between w-50">
                <p>{event.time}</p>
                <Button variant="secondary">View</Button>
              </div>
            </div>
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
