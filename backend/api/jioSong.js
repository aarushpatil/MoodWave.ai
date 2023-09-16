const axios = require('axios');
const querystring = require('querystring');

// const songs = ['Happy',
// "Can't Stop the Feeling!",
// 'I Wanna Dance with Somebody',
// 'Walking on Sunshine',
// "Don't Stop Me Now"];
// const artists = ['Pharrell Williams',
// 'Justin Timberlake',
// 'Whitney Houston',
// 'Katrina and The Waves',
// 'Queen'];

async function getSongData(songName, artistName) {
  const apiUrl = 'https://saavn.me/search/songs';
  const queryParams = {
    query: songName,
    page: 1,
    limit: 2
  };

  // Serialize the query parameters
  const serializedParams = querystring.stringify(queryParams);

  // Create the final URL by appending the serialized parameters
  const finalUrl = `${apiUrl}?${serializedParams}`;
  // console.log(finalUrl);

  try {
    const response = await axios.get(finalUrl);

    // Iterate through the results and check for a match
    for (let i = 0; i < response.data.data.results.length; i++) {
      let song = response.data.data.results[i];
      const artist = song.primaryArtists;

      // Iterate through the artists and check if they match
      const artistArray = artist.split(", ");
      for (let k = 0; k < artistArray.length; k++) {
        if (artistArray[k].replace(/&amp;/g, 'and') === artistName) {
          // Return the link here
          const imagesOfSameSong = response.data.data.results[i].image;
          const link = "" + imagesOfSameSong[imagesOfSameSong.length - 1].link;
          return link;
        }
      }
    }

    console.log("\n No song with that artist was found :(");
    return null; // Return null if no match is found
  } catch (error) {
    console.error('Error:', error);
    throw error; // Throw the error to be caught by the caller
  }
}


module.exports = {getSongData};

// async function run()
// {
//     let images = [];
// for(let i = 0; i < songs.length; i++)
// {
//     console.log(songs[i], artists[i]);
//     const temp = await getSongData(songs[i], artists[i]);
//     images.push(temp);
// }
// console.log(songs, artists, images);
// }
// run();

// module.exports = {songs, artists};