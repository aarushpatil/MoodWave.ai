import "./App.css";
import logo from "./moodwave.png";
import Cam from "./components/WebCamera";
import { useState } from "react";
import Emotions from "./components/Emotions";
import Songs from "./components/Songs";
function App() {
  const [showCam, setShowCam] = useState(true);
  const [showSongs, setShowSongs] = useState(false);
  const [showEmotion, setShowEmotion] = useState(false);

  const toState2 = () => {
    setShowCam(false);
    setShowEmotion(true);
    setShowSongs(false);
  };
  const toState3 = () => {
    setShowCam(false);
    setShowEmotion(false);
    setShowSongs(true);
  };
  const toState1 = () => {
    setShowCam(true);
    setShowEmotion(false);
    setShowSongs(false);
  };

  return (
    <>
      <div className="bg-gradient-to-tr from-backgradientbot to-backgradienttop h-screen">
        <div className="flex items-center justify-center p-3 ">
          <img src={logo} alt="moodwave" className=" max-w-10 max-h-20" />
        </div>

        <div className="px-5 flex justify-center flex-col items-center">
          <div className=" backdrop-blur-sm bg-white/10 rounded-3xl p-4 w-full">
            {showCam ? <Cam /> : showEmotion ? <Emotions /> : <Songs />}
          </div>

          {showCam ? (
            <div className="pt-10 flex justify-center">
              <button
                type="submit"
                id="login-button"
                onClick={(e) => toState2(e)}
                className=" bg-button shadow-md px-8 py-2 rounded-full text-white font-Lato text-center text-lg font-bold"
              >
                Scan
              </button>
            </div>
          ) : showEmotion ? (
            <div className="pt-10 flex justify-center">
              <button
                type="submit"
                id="login-button"
                onClick={(e) => toState3(e)}
                className=" bg-button shadow-md px-8 py-2 rounded-full text-white font-Lato text-center text-lg font-bold"
              >
                Generate
              </button>
            </div>
          ) : (
            <div className="pt-10 flex justify-center">
              <button
                type="submit"
                id="login-button"
                onClick={(e) => toState1(e)}
                className=" bg-button shadow-md px-8 py-2 rounded-full text-white font-Lato text-center text-lg font-bold"
              >
                New Face!
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
