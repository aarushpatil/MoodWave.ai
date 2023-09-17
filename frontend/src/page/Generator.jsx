import Emotions from "../components/Emotions";
import { useEffect, useState } from "react";
import axios from "axios";
import Cam from "./components/WebCamera";
import Songs from "./components/Songs";
import Banner from "./components/MoodWaveBanner";

function Generator() {
  // const [loading, setLoading] = useState(false);
  const [showEmotion, setShowEmotion] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [showCam, setShowCam] = useState(true);
  const [submitImage, setSubmitImage] = useState(false);
  const [image, setImage] = useState("");
  // const [showSongs, setShowSongs] = useState(false);
  const [emotionJSON, setEmotionJSON] = useState([]);
  const [songsJSON, setSongsJSON] = useState([]);
  const State1 = () => {
    setShowCam(true);
    setShowEmotion(false);
    setShowSongs(false);
    setImage("");
  };

  const State2 = () => {
    setShowCam(false);
    setShowEmotion(true);
    setShowSongs(false);
    setSubmitImage(!submitImage);
  };
  const State3 = () => {
    setEmotionJSON([]);
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

        const response = await axios.post(
          "http://localhost:4000/api/v1/image/url",
          { image: image }
        );

        const data = response.data;
        console.log(data);
        setEmotionJSON(data);
        setSubmitImage(!submitImage);
      }
    }

    //Call function
    evaluateEmotion();
  }, [image, setEmotionJSON, submitImage]);

  useEffect(() => {
    //Function for backend call
    async function suggestSongs() {
      if (emotionJSON) {
        console.log("image evaluating");

        const response = await axios.post(
          "http://localhost:4000/api/v1/songs",
          {
            emotion: `${emotionJSON[0].name},${emotionJSON[0].name},${emotionJSON[0].name}`,
          }
        );

        const data = response.data;
        console.log(data);
        setSongsJSON(data);
      }
    }

    //Call function
    suggestSongs();
  }, [emotionJSON]);

  return (
    <div className="bg-gradient-to-r from-backgradientbot to-backgradienttop h-screen overflow-auto pb-9">
      <Banner />

      <div className="px-5 flex justify-center flex-col items-center">
        <div className=" backdrop-blur-sm bg-white/10 rounded-3xl p-4 w-full">
          {showCam ? (
            <Cam
              setEmotionJSON={setEmotionJSON}
              image={image}
              setImage={setImage}
            />
          ) : showEmotion ? (
            <Emotions emotionJSON={emotionJSON} />
          ) : (
            <Songs songsJSON={songsJSON} />
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
        ) : showEmotion && emotionJSON ? (
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
  );
}

export default Generator;
