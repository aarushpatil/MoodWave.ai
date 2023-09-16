import React, { useState } from "react";
import Webcam from "react-webcam";
import { AiOutlineCamera } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios";
// const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 10000,
  height: 10000,
  facingMode: "user",
};

const WebcamCapture = () => {
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(typeof imageSrc);
    setImage(imageSrc);
  }, []);

  useEffect(() => {
    console.log("image evaluating");
    async function evaluateEmotion() {
      if (image !== "") {
        const response = await axios.get("https://localhost:3000/api/v1/image");
        const data = response.data;
        console.log(data);
      }
    }
    evaluateEmotion();
  }, [image]);
  return (
    <div>
      <div className="">
        {image === "" ? (
          <Webcam
            audio={false}
            // height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={true}
            // width={220}
            videoConstraints={videoConstraints}
            className="w-full object-cover aspect-square rounded-2xl"
          />
        ) : (
          <img
            src={image}
            className="w-full object-cover aspect-square rounded-2xl"
            alt="pic"
          />
        )}
      </div>
      <div className="flex justify-center pt-4 pb-3">
        {image !== "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage("");
            }}
            className="ease-in-out duration-300 backdrop-blur-sm p-4 bg-white/10 rounded-3xl hover:bg-white/20"
          >
            <BsTrash className="text-3xl text-red-500" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="ease-in-out duration-300 backdrop-blur-sm p-4 bg-white/10 rounded-3xl hover:bg-white/20 "
          >
            <AiOutlineCamera className="text-3xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
