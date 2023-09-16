const axios = require('axios');
const querystring = require('querystring');

//TEMPORARY VAR:
const songName = "";
//TEMPORARY VAR:
const artistName = "";


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
console.log(finalUrl);

axios.get(finalUrl)
  .then(response => {
    //iterate through the first 50 songs and check to make sure the artist matches
    const SEARCH_DEPTH = 200;
    // console.log(response.data.data.results)
    let found = false
    for(let i = 0; i < response.data.data.results.length; i++)
    {
        let song = response.data.data.results[i];
        // console.log(song.name + ", " + song.primaryArtists);
        let name = song.name
        const artist = song.primaryArtists

        //iterate through the artists and check to see if they match
        const artistArray = artist.split(", ")
        // console.log("the array: " + artistArray)
        for(let i = 0; i < artistArray.length; i++)
        {
            // console.log("art: " + artistArray[i])
            // console.log("artist: " + artistName)

            if(artistArray[i].replace(/&amp;/g, 'and') === artistName)
            {
                console.log("**************** artist founddd")
                console.log(name, artist)
                found = true;
                break;
            }
        }
        if(found)
        {
            break;
        }
    }
    if(!found)
    {
        console.log("\n No song with that artist was found :(")
    }

  })
  .catch(error => {
    console.error('Error:', error);
  });