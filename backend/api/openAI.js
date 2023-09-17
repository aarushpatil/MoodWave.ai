const readline = require("readline");
//open ai configuration
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
// require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateMeta = async (mood, previousSongs) => {
  console.log("Enter song method");
  let cont = `Give me 30 songs about ${mood}. In the format: songName by songArtist, songName by songArtist.`;
  //    I already know these songs: ${Array.from(
  //     previousSongs
  //   ).join(", ")}`;
  // console.log(cont);

  const songs = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: cont,
      },
    ],
    max_tokens: 250,
  });
  console.log("after chatgpt");
  const response = songs.data.choices[0].message;
  //   console.log(response);
  //   console.log("          -          ");
  //   console.log("          -           ");
  //   console.log("          -          ");

  // Split the input string into lines
  const lines = response.content
    .split("\n")
    .filter((line) => line.trim() !== "");

  const titles = [];
  const authors = [];

  // Loop through the lines and extract songs and authors
  lines.forEach((line) => {
    const tempArr = line.split('"');
    titles.push(tempArr[1]);
    try {
      const temp2 = tempArr[2].split("by ");
      authors.push(temp2[1]);
    } catch (err) {
      console.log(err);
    }
  });

  // console.log(titles)
  // console.log(authors)
  return { titles, authors };
};

//generateMeta("happy", ["yay"]);
module.exports = { generateMeta };
