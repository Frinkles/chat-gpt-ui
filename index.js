OpenAI = require("openai")
const { Configuration, OpenAIApi } = OpenAI;


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    apiKey: "",
});

const openai = new OpenAIApi(configuration);



app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        temperature: 0,
        max_tokens: 200,
      });
      if(response.data.choices[0].text){
        res.json({
            message: response.data.choices[0].text
        })
      }
});

app.listen(port, () => {
    console.log(`Example app listening in port ${port}`)
})