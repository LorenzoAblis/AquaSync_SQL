import { BrowserRouter, Routes, Route } from "react-router-dom";
import MeetsView from "./meets/MeetsPage";
import ViewMeet from "./meets/ViewMeetPage";

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MeetsView/>}/>
          <Route path="/view-meet/:meetId" element={<ViewMeet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
