import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewMeet = () => {
    const location = useLocation();
    // const navigate = useNavigate();

    const [meet, setMeet] = useState({
        name: "",
        location: "",
        date: "",
        opponent: "",
      });

  const meetId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchMeet = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/meets/${meetId}`);

        setMeet(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeet();
  });

  return (
    <>
        <h1>{meet.name}</h1>
    </>
  )
};

export default ViewMeet;