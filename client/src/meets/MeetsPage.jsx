import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Meets.css";
import AddMeetModal from "./AddMeetModal";
import DeleteMeetConfirmationModal from "./DeleteMeetConfirmationModal";
import { Card, Button, Container, Form, Dropdown } from "react-bootstrap";

const Meets = () => {
  const [meets, setMeets] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddMeet, setShowAddMeet] = useState(false);
  const [meetIdToBeDeleted, setMeetIdToBeDeleted] = useState("");
  const [meetNameToBeDeleted, setMeetNameToBeDeleted] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("name");

  const handleDelete = (id, name) => {
    setShowDeleteConfirmation(true);
    setMeetIdToBeDeleted(id);
    setMeetNameToBeDeleted(name);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMeets = meets.filter((meet) =>
    meet[selectedFilter].toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchAllMeets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/meets");
        setMeets(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllMeets();
  });

  return (
    <>
      <Container className="mt-3">
        <div className="d-flex flex-column w-100 mb-2">
          <h1 className="text-white meets-title">Meets</h1>
          <div className="p-2">
            <Button
              variant="success"
              className="rounded-squrare shadow-lg"
              onClick={() => setShowAddMeet(true)}
            >
              <i className="bi bi-plus-square add-button"></i>
            </Button>

            <Dropdown className="d-inline-block">
              <Dropdown.Toggle
                variant="secondary"
                style={{ marginLeft: "10px" }}
                className="shadow-lg"
              >
                <i className="bi bi-funnel filter-button"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>Search By:</Dropdown.Header>
                <Dropdown.Item
                  active={selectedFilter === "name"}
                  onClick={() => setSelectedFilter("name")}
                >
                  Name
                </Dropdown.Item>
                <Dropdown.Item
                  active={selectedFilter === "location"}
                  onClick={() => setSelectedFilter("location")}
                >
                  Location
                </Dropdown.Item>
                <Dropdown.Item
                  active={selectedFilter === "date"}
                  onClick={() => setSelectedFilter("date")}
                >
                  Date
                </Dropdown.Item>
                <Dropdown.Item
                  active={selectedFilter === "opponent"}
                  onClick={() => setSelectedFilter("opponent")}
                >
                  Opponent
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Form
              className="d-inline-block shadow-lg"
              style={{ marginLeft: "15px", width: "90%" }}
            >
              <Form.Control
                placeholder="Search"
                onChange={handleSearchChange}
              />
            </Form>
          </div>
        </div>

        <section className="d-flex flex-wrap justify-content-md-start">
          {filteredMeets.map((meet) => (
            <Card key={meet.meet_id} className="text-white p-1 shadow-lg m-2">
              <Card.Body className="d-flex flex-column">
                <div>
                  <Card.Title>{meet.location}</Card.Title>
                  <h1>{meet.name}</h1>
                  <h5>{meet.date}</h5>
                </div>
                <div className="d-flex justify-content-between mt-auto">
                  <Link to={`/view-meet/${meet.meet_id}`}>
                    <Button variant="dark">View</Button>
                  </Link>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(meet.meet_id, meet.name)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </section>
      </Container>

      <AddMeetModal showAddMeet={showAddMeet} setShowAddMeet={setShowAddMeet} />

      <DeleteMeetConfirmationModal
        meetId={meetIdToBeDeleted}
        setMeetId={setMeetIdToBeDeleted}
        meetName={meetNameToBeDeleted}
        setMeetName={setMeetNameToBeDeleted}
        showDeleteConfirmation={showDeleteConfirmation}
        setShowDeleteConfirmation={setShowDeleteConfirmation}
      />
    </>
  );
};

export default Meets;
