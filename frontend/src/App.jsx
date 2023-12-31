import "./App.css";

//React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Generator from "./page/Generator";
import Landing from "./page/Landing";

import NotFound from "./page/NotFound";
import Footer from "./components/Footer";

function App() {
  //trying to show different content other than the camera and capture button
  //the different content would be the data retrieved from api backend

  //h-screen is the height of the most outer div for the background color
  //When the size of the camera increases, the generate button and image overflows
  //out of the outer-most div

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/generator" element={<Generator />} />

        {/* Extra pages */}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
