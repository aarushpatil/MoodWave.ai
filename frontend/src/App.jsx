import "./App.css";
import logo from "./moodwave.png";
import Cam from "./components/WebCamera";
import { useState } from "react";
import Emotions from "./components/Emotions";

function App() {
  // const [loading, setLoading] = useState(false);
  const [showEmotion, setShowEmotion] = useState(false);
  const [showCam, setShowCam] = useState(true);
  // const [showSongs, setShowSongs] = useState(false);

  const submitForm = () => {
    setShowCam(!showCam);
    setShowEmotion(!showEmotion);
  };

  //trying to show different content other than the camera and capture button
  //the different content would be the data retrieved from api backend

  //h-screen is the height of the most outer div for the background color
  //When the size of the camera increases, the generate button and image overflows
  //out of the outer-most div

  return (
    <>
      <div className="bg-gradient-to-r from-backgradientbot to-backgradienttop">
        <div className="flex items-center justify-center p-3 ">
          <img src={logo} alt="moodwave" className=" max-w-10 max-h-20" />
        </div>

        <div className="px-5 flex justify-center flex-col items-center">
          <div className=" backdrop-blur-sm bg-white/10 rounded-3xl p-4 w-full">
            {showCam ? <Cam /> : <Emotions />}
          </div>

          <div className="pt-10 flex justify-center">
            <button
              type="submit"
              id="login-button"
              onClick={(e) => submitForm(e)}
              className=" bg-button shadow-md px-8 py-2 rounded-full text-white font-Lato text-center text-lg font-bold"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
