const hume = require("../api/humeAI");

const image = async (req, res) => {
  // if (!req.files || Object.keys(req.files).length === 0) {
  //     return res.status(400).send("No files were uploaded.");
  //   }

  //   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  //   sampleFile = req.files.sampleFile;
  //   uploadPath = __dirname + "/backend/temp/" + sampleFile.name;

  //   // Use the mv() method to place the file somewhere on your server
  //   sampleFile.mv(uploadPath, function (err) {
  //     if (err) return res.status(500).send(err);
  //   });
  const job_id = await hume.startJob();
  console.log("Job IDD", job_id);
  const emotion = await hume.getPredictions(job_id);

  res.json(emotion);
};
module.exports = {
  image,
};
