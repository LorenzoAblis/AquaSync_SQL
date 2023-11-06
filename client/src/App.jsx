import { BrowserRouter, Routes, Route } from "react-router-dom";
import MeetsView from "./meet_pages/Meets";
import ViewMeet from "./meet_pages/ViewMeet";
import AddEvent from "./event_pages/AddEvent";

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MeetsView/>}/>
          <Route path="/add-event" element={<AddEvent/>}/>
          <Route path="/view-meet/:meetId" element={<ViewMeet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
