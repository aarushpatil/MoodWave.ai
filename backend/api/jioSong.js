const sdk = require("api")("@hume/v0#55738li58u312");

async function humeStartJob() {
  try {
    const data = await sdk.start_job(
      '{"models":{"face":{"fps_pred":3,"prob_threshold":0.99,"identify_faces":false,"min_face_size":60,"save_faces":false},"prosody":{"granularity":"utterance","identify_speakers":false,"window":{"length":4,"step":1}},"language":{"granularity":"word","identify_speakers":false},"ner":{"identify_speakers":false}},"transcription":{"language":null},"notify":false}',
      {
        "content-type": "application/json; charset=utf-8",
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default humeStartJob;
