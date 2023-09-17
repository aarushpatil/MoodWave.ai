const { getSongData } = require("../api/jioSong");
const genSongs = require("../api/openAI");
const getSongImages = require("../api/jioSong");

// Function to introduce a delay of 1 second
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Method to get songs
const song = async (req, res) => {
  let mood = req.body.emotion;
  let songDataList = await genSongs.generateMeta(mood);
  console.log(songDataList.authors, songDataList.titles);
  const titles = songDataList.titles;
  const authors = songDataList.authors;
  

  let images = [];
  let playURL = [];

  let titless = [];
  let authorss = [];

  let counter = 0;
  let previousSongs = new Set();
  const numSongsToFind = 4;

  //keep generating 1 song at a time till 5 total songs are found
  while (counter < numSongsToFind) {
    console.log(counter);
    //openAi's stuff
    try {
      let songDataList = await genSongs.generateMeta(mood, previousSongs);
      // console.log(songDataList.authors, songDataList.titles);
      const title = songDataList.titles[0]; //contains title
      const author = songDataList.authors[0]; //contains author
      previousSongs.add(title + " by " + author);
      

      //make sure I can find the song
      let stuff = await getSongImages.getSongData(title, author);
      let image = stuff.img;
      //make sure I haven't already found the song and that it isn't null
      if (image != null && !images.includes(image)) {
        titless.push(title);
        authorss.push(author);
        let downloadLink = stuff.downloadUrl;
        images.push(image);
        counter++;
        playURL.push(downloadLink);
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  }
  console.log("Before: " + images);

  let objs = [];
  //make an array of objects now
  for(let i = 0; i < images.length; i++)
  {
    objs.push({title: titless[i], author: authorss[i],imageUrl: images[i],playUrl: playURL[i]});
  }
  // console.log(objs);
  res.status(200).json(objs);
};
song();

module.exports = { song };
