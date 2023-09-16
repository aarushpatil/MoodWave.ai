const hume = require("../api/humeAI");
const cloudinary = require("cloudinary");

const image = async (req, res) => {
  try {
    const job_id = await hume.startJob(req.body.image);
    console.log("Job ID:", job_id);

    // Wait for the predictions to be ready
    const emotion = await new Promise((resolve) => {
      setTimeout(async () => {
        const predictions = await hume.getPredictions(job_id);
        resolve(predictions);
      }, 5000);
    });

    res.json(emotion);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  image,
};
