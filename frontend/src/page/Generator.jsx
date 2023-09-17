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
    setSongsJSON([]);
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
          console.log(image);
          const response = await axios.post(
            "https://moodwave-adam.onrender.com/api/v1/image/url",
            { image: image }
          );
          console.log(response.headers);
          const data = response.data;
          console.log("Received Data:", data);
          setEmotionJSON(data);
        } catch (error) {
          console.error("Error fetching emotion:", error);
        }
        setSubmitImage((image) => !image);
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
      if (pagination === "songs" && submitSongs) {
        try {
          console.log("song suggesting");
          const response = await axios.post(
            "https://moodwave-adam.onrender.com/api/v1/songs",
            {
              // assuming you want to send the same emotion name three times
              emotion: `${emotionJSON[0].name},${emotionJSON[1].name},${emotionJSON[2].name}`,
            }
          );
          console.log("song suggesting");
          console.log(response);
          console.log(response.data);
          setSongsJSON(response.data);
          setSubmitSongs((prev) => !prev);
        } catch (error) {
          console.error("Error suggesting songs:", error);
          // Handle the error appropriately, perhaps set some state to show an error message to the user
        }
      }
    }

    suggestSongs();
  }, [pagination, emotionJSON]);

  return (
    <main className="bg-gradient-to-r from-backgradientbot to-backgradienttop overflow-hidden pb-9 flex flex-col">
      <Banner />

      <section className="px-5 flex justify-center flex-col items-center flex-grow">
        {(() => {
          switch (pagination) {
            case "webcam":
              return (
                <SubWebcam
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
