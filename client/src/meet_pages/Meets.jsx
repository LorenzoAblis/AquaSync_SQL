import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

const Meets = () => {
    const [meets, setMeets] = useState([]);

  useEffect(() => {
    const fetchAllMeets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/meets");
        setMeets(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllMeets();
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/meets/" + id);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        {meets.map((meet) => (
          <div key={meet.id}>
            <h2 key={meet.id}>{meet.name}</h2>
            <div>
              <button><Link to={`/view-meet/${meet.id}`}>View</Link></button>
              <button><Link to={`/edit-meet/${meet.id}`}>Edit</Link></button>
              <button onClick={() => handleDelete(meet.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button><Link to="/add-meet">Add</Link></button>
      <button><Link to="/add-event">Event</Link></button>

    </>
  );
}

export default Meets;