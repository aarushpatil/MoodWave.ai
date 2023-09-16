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
const imageURL = async (req, res) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  //Base conversion and storage of tempPhotos
  var base64Str = req.body.image;
  const imagePath = path.join(__dirname, "../temp/");
  var optionalObj = { type: "jpg" };
  const imageInfo = base64ToImage(base64Str, imagePath, optionalObj);

  const { imageType, fileName } = imageInfo;
  //Upload file
  const imageToUpload = imagePath + fileName;
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  let result;
  try {
    // Upload the image
    result = await cloudinary.uploader.upload(imageToUpload, options);
  } catch (error) {
    console.error(error);
  }

  const cloudinary_url = result.url;

  const job_id = await hume.startJobURL(cloudinary_url);
  console.log("Job ID:", job_id);

  // Wait for the predictions to be ready
  const emotion = await new Promise((resolve) => {
    setTimeout(async () => {
      const predictions = await hume.getPredictionsURL(job_id);
      resolve(predictions);
    }, 4000);
  });
  console.log(emotion);
  res.send(emotion);
};

module.exports = {
  image,
  imageURL,
};
