const readline = require('readline')
//open ai configuration
const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
})

const openai = new OpenAIApi(configuration)

const generateMeta = async (mood) => {

  const songs = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: 'user',
        content: `Give me 5 songs for the following mood: ${mood} in this format: songName by songArtist, songName by songArtist`
      }
    ],
    max_tokens: 100
  })
  const response = songs.data.choices[0].message;
  console.log(response)
  console.log("          -          ")
  console.log("          -           ")
  console.log("          -          ")
 
  // Split the input string into lines
const lines = response.content.split('\n').filter(line => line.trim() !== '');

const title = [];
const author = [];

// Loop through the lines and extract songs and authors
lines.forEach(line => {
  const tempArr = line.split("\"");
  title.push(tempArr[1]);

  const temp2 = tempArr[2].split("by ");
  author.push(temp2[1]);
});

console.log(title)
console.log(author)

const obj = {title: "" + title[1]};

console.log("****************************")
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("Enter the mood: \n", (title) => generateMeta(title))

module.exports = songs