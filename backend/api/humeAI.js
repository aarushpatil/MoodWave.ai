const axios = require("axios");
const imageToBase64 = require("image-to-base64");

async function startJob() {
  try {
    const jpegBase64 = await imageToBase64("../temp/download.jpg");

    const options = {
      method: "POST",
      url: "https://api.hume.ai/v0/batch/jobs",
      headers: {
        accept: "application/json",
        "content-type":
          "multipart/form-data; boundary=---011000010111000001101001",
        "X-Hume-Api-Key": "xYkGp5L5I7ATd8BvhRDKsY9FxYGUztgHA2f8GSu8DpZAX91E",
      },
      data: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="json"\r\n\r\n{}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="file"\r\n\r\ndata:image/jpeg;name=download.jpg;base64,${jpegBase64}\r\n-----011000010111000001101001--\r\n\r\n`,
    };
    const response = await axios.request(options);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getPredictions(jobID) {
  try {
    const options = {
      method: "GET",
      url: `https://api.hume.ai/v0/batch/jobs/${jobID}/predictions`,
      headers: {
        accept: "application/json; charset=utf-8",
        "X-Hume-Api-Key": "xYkGp5L5I7ATd8BvhRDKsY9FxYGUztgHA2f8GSu8DpZAX91E",
      },
    };
    const response = await axios.request(options);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  startJob,
  getPredictions,
};
