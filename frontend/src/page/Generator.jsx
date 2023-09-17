import { useEffect, useState } from "react";
import axios from "axios";

import Banner from "../components/MoodWaveBanner";

//SubPages
import SubWebcam from "./subpage/Sub_WebCam";
import SubEmotions from "./subpage/Sub_Emotions";
import SubSongs from "./subpage/Sub_Songs";

function Generator() {
  // const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState("webcam");
  const [showEmotion, setShowEmotion] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [showCam, setShowCam] = useState(true);

  const [submitSongs, setSubmitSongs] = useState(false);
  const [submitImage, setSubmitImage] = useState(false);
  const [image, setImage] = useState("");
  // const [showSongs, setShowSongs] = useState(false);
  const [emotionJSON, setEmotionJSON] = useState([]);
  const [songsJSON, setSongsJSON] = useState([]);

  const ScanButton = () => {
    setSubmitImage(!submitImage);
    setPagination("emotions");
  };

  const GenerateButton = () => {
    setSubmitSongs(!submitSongs);
    setPagination("songs");
  };
  const RedoButton = () => {
    setEmotionJSON([]);
    setImage("");
    setPagination("webcam");
  };

  //SCANNER AND SEND TO BACK END
  useEffect(() => {
    //Function for backend call
    async function evaluateEmotion() {
      if (image !== "" && pagination === "emotions" && submitImage) {
        console.log("image evaluating");

        try {
          const response = await axios.post(
            "https://moodwave-adam.onrender.com/api/v1/image/url",
            { image: image }
          );
          const data = response.data;
          console.log("Received Data:", data);
          setEmotionJSON(data);
        } catch (error) {
          console.error("Error fetching emotion:", error);
        }
        setSubmitImage(!submitImage);
        setImage("");
      }
    }

    //Call function
    evaluateEmotion();
  }, [image, setEmotionJSON, submitImage, pagination]);

  //SONG SUGGESTER BACKEND
  useEffect(() => {
    //Function for backend call
    async function suggestSongs() {
      if (emotionJSON.length > 0 && pagination === "songs" && submitSongs) {
        console.log("image evaluating");

        const response = await axios.post(
          "https://moodwave-adam.onrender.com/api/v1/songs",
          {
            emotion: `${emotionJSON[0].name},${emotionJSON[0].name},${emotionJSON[0].name}`,
          }
        );

        const data = response.data;
        console.log(data);
        setSongsJSON(data);
        setSubmitSongs((show) => !show);
      }
    }

    //Call function
    suggestSongs();
  }, [emotionJSON, pagination, submitSongs]);

  return (
    <main className="bg-gradient-to-r from-backgradientbot to-backgradienttop h-screen overflow-auto pb-9">
      <Banner />

      <section className="px-5 flex justify-center flex-col items-center">
        {(() => {
          switch (pagination) {
            case "webcam":
              return (
                <SubWebcam
                  showCam={showCam}
                  showEmotion={showEmotion}
                  ScanButton={ScanButton}
                  image={image}
                  setImage={setImage}
                />
              );
            case "emotions":
              return (
                <SubEmotions
                  GenerateButton={GenerateButton}
                  emotionJSON={emotionJSON}
                />
              );
            case "songs":
              return <SubSongs RedoButton={RedoButton} songsJSON={songsJSON} />;
            default:
              return null; // or you can return a default component or a 404 page
          }
        })()}
      </section>
    </main>
  );
}

export default Generator;
