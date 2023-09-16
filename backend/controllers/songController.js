const { getSongData } = require("../api/jioSong");
const genSongs = require("../api/openAI");
const getSongImages = require("../api/jioSong");

//method to get songs
const song = async (req, res) => {
  let mood = "sad";
  let songDataList = await genSongs.generateMeta(mood);
  console.log(songDataList.authors, songDataList.titles);
  const titles = songDataList.titles;
  const authors = songDataList.authors;
  //loop through each song and author and call getSongData

  // const titles = ["Happy", "Can't Stop the Feeling!"];
  // const authors = ["Pharrell Williams", "Justin Timberlake"];

  for (let i = 0; i < titles.length; i++) {
    let image = await getSongImages.getSongData(titles[i], authors[i]);
    console.log("heres da image link *********************: " + image);
  }
  // let image = await getSongImages.getSongData("Rage Against the Machine", "Killing in the Name");
  // console.log("heres da image link *********************: " + image);
};
//song();
module.exports = {
  song,
};
