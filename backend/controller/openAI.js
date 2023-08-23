const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const openai = new OpenAIApi(configuration);

async function translator(text) {
  // await delay(1000);
  try {
    const response = await openai.createChatCompletion({
      // const response = await openai.createCompletion({
      // model: "text-davinci-003",
      // prompt: `Convert '${text}' to marathi letters excludes numbers`,
      // temperature: 0,
      // max_tokens: 200,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Convert following ${text} in to Marathi Devanagari script`,
        },
      ],
      stop: ["\n", "\ninput:", "In Marathi Devanagari script", "would be:"],
    });

    return response.data.choices[0].message.content;
    // return response.data.choices[0].text?.trim();
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  return text;
}

async function descreptionTranslator(text) {
  // await delay(1000);
  try {
    const response = await openai.createChatCompletion({
      // const response = await openai.createCompletion({
      // model: "text-davinci-003",
      // prompt: `Convert '${text}' to marathi letters excludes numbers`,
      // temperature: 0,
      // max_tokens: 200,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `convert the following array [${text}] to marathi letters and return it in json format only.`,
        },
      ],
    });
    const data = JSON.parse(`${response.data.choices[0].message.content}`);
    console.log(data);
    return data.marathi_letters;
    // return response.data.choices[0].text?.trim();
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  return text;
}

module.exports = { translator, descreptionTranslator };
