import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMeet = () => {
  const [newMeet, setNewMeet] = useState({
    name: "",
    location: "",
    date: "",
    opponent: "",
  });

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/meets", newMeet);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setNewMeet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={handleChange}
          name="name"
        />
        <br />
        <input
          type="text"
          placeholder="Location"
          onChange={handleChange}
          name="location"
        />
        <br />
        <input
          type="text"
          placeholder="Date"
          onChange={handleChange}
          name="date"
        />
        <br />
        <input
          type="text"
          placeholder="Opponent"
          onChange={handleChange}
          name="opponent"
        />
        <br />
        <button onClick={handleClick}>Add</button>
      </div>
    </>
  );
};

export default AddMeet;
