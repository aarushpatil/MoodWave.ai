const axios = require("axios");

const imageToBase64 = require("image-to-base64");
const path = require("path");

async function startJob(imageBase64) {
  try {
    //-------------------------------------Backup conversion DONT DELETE
    // const imagePath = path.join(__dirname, "../temp/download.jpg");
    // const convertedBase64 = await imageToBase64(imagePath);

    const jpegBase64 = imageBase64;
    const model_configurations = {
      callback_url: null,
      urls: [],
      models: {
        face: {
          fps_pred: 3,
          prob_threshold: 0.99,
          identify_faces: false,
          min_face_size: 60,
          facs: null,
          descriptions: null,
          save_faces: false,
        },
        burst: {},
        prosody: {
          granularity: "utterance",
          identify_speakers: false,
          window: null,
        },
        language: {
          granularity: "word",
          identify_speakers: false,
          sentiment: null,
          toxicity: null,
        },
        ner: {
          identify_speakers: false,
        },
        facemesh: {},
      },
      notify: false,
    };
    const model_config = JSON.stringify(model_configurations);

    const options = {
      method: "POST",
      url: "https://api.hume.ai/v0/batch/jobs",
      headers: {
        accept: "application/json",
        "content-type":
          "multipart/form-data; boundary=---011000010111000001101001",
        "X-Hume-Api-Key": "xYkGp5L5I7ATd8BvhRDKsY9FxYGUztgHA2f8GSu8DpZAX91E",
      },
      data: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="json"\r\n\r\n${model_config}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="file"\r\n\r\ndata:image/jpeg;name=download.jpg;base64,${jpegBase64}\r\n-----011000010111000001101001--\r\n\r\n`,
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
    const options = {
      method: "GET",
      url: `https://api.hume.ai/v0/batch/jobs/${jobID}/predictions`,
      headers: {
        accept: "application/json; charset=utf-8",
        "X-Hume-Api-Key": "xYkGp5L5I7ATd8BvhRDKsY9FxYGUztgHA2f8GSu8DpZAX91E",
      },
    };

    const response = await axios.request(options);

    const data =
      response.data[0].results.predictions[0].models.language
        .grouped_predictions[0].predictions[0].emotions;
    data.sort((a, b) => b.score - a.score);
    return data;
  } catch (error) {
    console.log(error);
  }
}

//
async function startJobURL(URL) {
  try {
    const model_configurations = {
      callback_url: null,
      urls: [URL],
      models: {
        face: {
          fps_pred: 3,
          prob_threshold: 0.99,
          identify_faces: false,
          min_face_size: 60,
          facs: null,
          descriptions: null,
          save_faces: false,
        },
        burst: {},
        prosody: {
          granularity: "utterance",
          identify_speakers: false,
          window: null,
        },
        language: {
          granularity: "word",
          identify_speakers: false,
          sentiment: null,
          toxicity: null,
        },
        ner: {
          identify_speakers: false,
        },
        facemesh: {},
      },
      notify: false,
    };
    const model_config = JSON.stringify(model_configurations);

    const options = {
      method: "POST",
      url: "https://api.hume.ai/v0/batch/jobs",
      headers: {
        accept: "application/json",
        "content-type":
          "multipart/form-data; boundary=---011000010111000001101001",
        "X-Hume-Api-Key": "xYkGp5L5I7ATd8BvhRDKsY9FxYGUztgHA2f8GSu8DpZAX91E",
      },
      data: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="json"\r\n\r\n${model_config}\r\n-----011000010111000001101001--\r\n\r\n`,
    };
    const response = await axios.request(options);
    const data = response.data.job_id;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getPredictionsURL(jobID) {
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

    const data =
      response.data[0].results.predictions[0].models.face.grouped_predictions[0]
        .predictions[0].emotions;
    data.sort((a, b) => b.score - a.score);
    let topFive = [];
    for (let i = 0; i < 5; i++) {
      topFive[i] = data[i];
    }
    return topFive;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  startJob,
  getPredictions,
  startJobURL,
  getPredictionsURL,
};
