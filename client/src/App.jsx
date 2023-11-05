import { BrowserRouter, Routes, Route } from "react-router-dom";
import MeetsView from "./meet_pages/Meets";
import AddMeet from "./meet_pages/AddMeet";
import EditMeet from "./meet_pages/EditMeet";
import ViewMeet from "./meet_pages/ViewMeet";
import AddEvent from "./event_pages/AddEvent";

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MeetsView/>}/>
          <Route path="/add-meet" element={<AddMeet/>}/>
          <Route path="/add-event" element={<AddEvent/>}/>
          <Route path="/edit-meet/:meetId" element={<EditMeet/>}/>
          <Route path="/view-meet/:meetId" element={<ViewMeet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
