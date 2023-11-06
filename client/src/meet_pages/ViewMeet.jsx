import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewMeet = () => {
  const location = useLocation();

  const meetId = location.pathname.split("/")[2];

  const [edittingMode, setEdittingMode] = useState(false);

  const [meet, setMeet] = useState({
    name: "ghi",
    location: "",
    date: "",
    opponent: "",
  });

  const [edittedMeet, setEdittedMeet] = useState({
    name: meet.name,
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
      setEdittedMeet(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:5000/meets/" + meetId, edittedMeet);
      fetchMeet();
      setEdittingMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setEdittedMeet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  return (
    <>
      <div>
        <h1>{meet.name}</h1>
        <button onClick={() => setEdittingMode(!edittingMode)}>Edit</button>
        {!edittingMode && <div>
          <p><b>Location: </b>{meet.location || "N/A"}</p>
          <p><b>Opponent: </b>{meet.opponent || "N/A"}</p>
          <p><b>Date: </b>{meet.date || "N/A"}</p>
        </div>
        }

        {edittingMode && <div>
          <input
          type="text"
          placeholder="Name"
          onChange={handleInputChange}
          name="name"
          value={edittedMeet.name}
        /><br/>
        <input
          type="text"
          placeholder="Location"
          onChange={handleInputChange}
          name="location"
          value={edittedMeet.location}
        /><br/>
        <input
          type="text"
          placeholder="Date"
          onChange={handleInputChange}
          name="date"
          value={edittedMeet.date}
        /><br/>
        <input
          type="text"
          placeholder="Opponent"
          onChange={handleInputChange}
          name="opponent"
          value={edittedMeet.opponent}
        /><br/>
        <button onClick={handleUpdate}>Update</button>
        </div>}
      </div>
    </>
  );
};

export default ViewMeet;
