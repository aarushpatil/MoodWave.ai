const readline = require('readline')
//open ai configuration
const { Configuration, OpenAIApi } = require('openai')
// require('dotenv').config()

const configuration = new Configuration({
  apiKey: "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",
})

const openai = new OpenAIApi(configuration)

const generateMeta = async (mood) => {

  const songs = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: 'user',
        content: `Give me 10 new songs for the following mood: ${mood} in this format: songName by songArtist, songName by songArtist`
      }
    ],
    max_tokens: 250
  })
  const response = songs.data.choices[0].message;
  console.log(response)
  console.log("          -          ")
  console.log("          -           ")
  console.log("          -          ")
 
  // Split the input string into lines
const lines = response.content.split('\n').filter(line => line.trim() !== '');

const titles = [];
const authors = [];

// Loop through the lines and extract songs and authors
lines.forEach(line => {
  const tempArr = line.split("\"");
  titles.push(tempArr[1]);

  const temp2 = tempArr[2].split("by ");
  authors.push(temp2[1]);
});

// console.log(titles)
// console.log(authors)
return {titles, authors};
}

// generateMeta("happy")
module.exports = {generateMeta};