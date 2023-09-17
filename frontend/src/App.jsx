import "./App.css";

//React Router
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

//Pages
import Generator from "./page/Generator";
import LandingPage from "./page/Landing";
import AboutPage from "./page/AboutPage";
import NotFound from "./page/NotFound";

function App() {
  //trying to show different content other than the camera and capture button
  //the different content would be the data retrieved from api backend

  //h-screen is the height of the most outer div for the background color
  //When the size of the camera increases, the generate button and image overflows
  //out of the outer-most div

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generator" element={<Generator />} />

        {/* Extra pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
