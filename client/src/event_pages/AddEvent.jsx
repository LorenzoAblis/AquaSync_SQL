import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [newEvent, setNewEvent] = useState({
    meet_id: 0,
    stroke: "",
    distance: 0,
    time: "",
  });

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/events", newEvent);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setNewEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div>
        <input
          type="number"
          placeholder="Meet ID"
          onChange={handleChange}
          name="meet_id"
        />
        <br />
        <input
          type="text"
          placeholder="Stroke"
          onChange={handleChange}
          name="stroke"
        />
        <br />
        <input
          type="number"
          placeholder="Distance"
          onChange={handleChange}
          name="distance"
        />
        <br />
        <input
          type="text"
          placeholder="Time"
          onChange={handleChange}
          name="time"
        />
        <br />
        <button onClick={handleClick}>Add Event</button>
      </div>
    </>
  );
};

export default AddEvent;
