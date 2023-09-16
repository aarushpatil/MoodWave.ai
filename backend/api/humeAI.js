const axios = require("axios");
const { TIMEOUT } = require("dns");
const imageToBase64 = require("image-to-base64");
const path = require("path");
async function startJob() {
  try {
    const imagePath = path.join(__dirname, "../temp/download.jpg");
    const jpegBase64 = await imageToBase64(imagePath);
    const callback_URL = "https://moodwave-adam.onrender.com" + "/callback";
    console.log("Trying to access:", imagePath);
    const options = {
      method: "POST",
      url: "https://api.hume.ai/v0/batch/jobs",
      headers: {
        accept: "application/json",
        "content-type":
          "multipart/form-data; boundary=---011000010111000001101001",
        "X-Hume-Api-Key": "xYkGp5L5I7ATd8BvhRDKsY9FxYGUztgHA2f8GSu8DpZAX91E",
      },
      data: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="json"\r\n\r\n{"models":{"face":{"fps_pred":3,"prob_threshold":0.99,"identify_faces":false,"min_face_size":60,"save_faces":false},"prosody":{"granularity":"utterance","identify_speakers":false,"window":{"length":4,"step":1}},"language":{"granularity":"word","identify_speakers":false},"ner":{"identify_speakers":false}},"transcription":{"language":null},"notify":false,"callback_url":${callback_URL}}}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="file"\r\n\r\ndata:image/jpeg;name=download.jpg;base64,${jpegBase64}\r\n-----011000010111000001101001--\r\n\r\n`,
    };
    const response = await axios.request(options);
    const data = response.data.job_id;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getPredictions(jobID) {
  try {
    setTimeout(function () {
      console.log("This will be printed after 3 seconds");
    }, 5000);
    const options = {
      method: "GET",
      url: `https://api.hume.ai/v0/batch/jobs/${jobID}/predictions`,
      headers: {
        accept: "application/json; charset=utf-8",
        "X-Hume-Api-Key": "xYkGp5L5I7ATd8BvhRDKsY9FxYGUztgHA2f8GSu8DpZAX91E",
      },
    };

    const response = await axios.request(options);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  startJob,
  getPredictions,
};
