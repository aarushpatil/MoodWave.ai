import "./App.css";
import logo from "./moodwave.png";
import Cam from "./components/WebCamera";
import { useState, useEffect } from "react";
import Emotions from "./components/Emotions";
import axios from "axios";
import Songs from "./components/Songs";
function App() {
  // const [loading, setLoading] = useState(false);
  const [showEmotion, setShowEmotion] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [showCam, setShowCam] = useState(true);
  const [submitImage, setSubmitImage] = useState(false);
  const [image, setImage] = useState("");
  // const [showSongs, setShowSongs] = useState(false);
  const [emotionJSON, setEmotionJSON] = useState({});

  const State1 = () => {
    setShowCam(true);
    setShowEmotion(false);
    setShowSongs(false);
  };

  const State2 = () => {
    setShowCam(false);
    setShowEmotion(true);
    setShowSongs(false);
  };
  const State3 = () => {
    setShowCam(false);
    setShowEmotion(false);
    setShowSongs(true);
  };

  //Make a call to the back
  useEffect(() => {
    //Function for backend call
    async function evaluateEmotion() {
      if (image !== "" && submitImage) {
        console.log("image evaluating");
        const imageCleaned = image.split(",")[1];
        console.log(imageCleaned);
        const response = await axios.post(
          "http://localhost:4000/api/v1/image",
          { image: imageCleaned }
        );
        if (response.ok) {
          const data = response.data;
          setEmotionJSON(data);
          setSubmitImage(!submitImage);
        }
      }
    }

    //Call function
    evaluateEmotion();
  }, [image, setEmotionJSON, submitImage]);
  //trying to show different content other than the camera and capture button
  //the different content would be the data retrieved from api backend

  //h-screen is the height of the most outer div for the background color
  //When the size of the camera increases, the generate button and image overflows
  //out of the outer-most div

  return (
    <>
      <div className="bg-gradient-to-r from-backgradientbot to-backgradienttop h-screen overflow-auto pb-9">
        <div className="flex items-center justify-center p-3 ">
          <img src={logo} alt="moodwave" className=" max-w-10 max-h-20" />
        </div>

        <div className="px-5 flex justify-center flex-col items-center">
          <div className=" backdrop-blur-sm bg-white/10 rounded-3xl p-4 ">
            {showCam ? (
              <Cam
                setEmotionJSON={setEmotionJSON}
                image={image}
                setImage={setImage}
              />
            ) : showEmotion ? (
              <Emotions />
            ) : (
              <Songs />
            )}
          </div>

          {showCam ? (
            <div className="pt-10 flex justify-center">
              <button
                type="submit"
                id="login-button"
                onClick={(e) => State2(e)}
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
                onClick={(e) => State3(e)}
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
                onClick={(e) => State1(e)}
                className=" bg-button shadow-md px-8 py-2 rounded-full text-white font-Lato text-center text-lg font-bold"
              >
                Again
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
