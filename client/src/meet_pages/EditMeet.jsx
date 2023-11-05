// import React from 'react'

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const EditMeet = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const meetId = location.pathname.split("/")[2];

  const [newMeet, setNewMeet] = useState({
    name: "",
    location: "",
    date: "",
    opponent: "",
  });

  const [prevMeet, setPrevMeet] = useState({
    name: "",
    location: "",
    date: "",
    opponent: "",
  });

  useEffect(() => {
    const fetchMeet = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/meets/${meetId}`);

        setPrevMeet(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeet();
  });

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:5000/meets/" + meetId, newMeet);

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
        <h1>{prevMeet.name}</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={handleChange}
          name="name"
        /><br/>
        <input
          type="text"
          placeholder="Location"
          onChange={handleChange}
          name="location"
        /><br/>
        <input
          type="text"
          placeholder="Date"
          onChange={handleChange}
          name="date"
        /><br/>
        <input
          type="text"
          placeholder="Opponent"
          onChange={handleChange}
          name="opponent"
        /><br/>
        <button onClick={handleClick}>Update</button>
      </div>
    </>
  );
};

export default EditMeet;
