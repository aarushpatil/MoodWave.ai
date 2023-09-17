const readline = require("readline");
//open ai configuration
const { Configuration, OpenAIApi } = require("openai");
// require('dotenv').config()

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const generateMeta = async (mood, previousSongs) => {
    let cont = `Give me a song about ${mood}. In the format: songName by songArtist. I already know these songs: ${(Array.from(previousSongs)).join(', ')}`;
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

    const temp2 = tempArr[2].split("by ");
    authors.push(temp2[1]);
  });

  // console.log(titles)
  // console.log(authors)
  return { titles, authors };
};

// generateMeta("happy")
module.exports = { generateMeta };