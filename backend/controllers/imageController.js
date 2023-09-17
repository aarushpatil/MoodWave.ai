const hume = require("../api/humeAI");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const base64ToImage = require("base64-to-image");
require("dotenv").config();

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

//Upload the image to use in the url
const fsPromises = fs.promises;

const imageURL = async (req, res) => {
  const imagePath = path.join(__dirname, "../temp/");
  var optionalObj = { type: "jpg" };
  const imageInfo = base64ToImage(req.body.image, imagePath, optionalObj);

  const { fileName } = imageInfo;
  const imageToUpload = imagePath + fileName;
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  let cloudinary_url, emotion;

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(imageToUpload, options);
    cloudinary_url = result.url;

    // Process the image with Hume API
    const job_id = await hume.startJobURL(cloudinary_url);
    console.log("Job ID:", job_id);

    emotion = await new Promise((resolve) => {
      setTimeout(async () => {
        const predictions = await hume.getPredictionsURL(job_id);
        resolve(predictions);
      }, 4000);
    });

    console.log(emotion);
    res.send(emotion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Remove the temporary file
    try {
      await fsPromises.unlink(imageToUpload);
      console.log(`Successfully deleted temporary file: ${imageToUpload}`);
    } catch (unlinkError) {
      console.error(
        `Failed to delete temporary file: ${imageToUpload}. Error:`,
        unlinkError
      );
    }
  }
};

module.exports = {
  image,
  imageURL,
};
