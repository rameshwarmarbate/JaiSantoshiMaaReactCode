const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const openai = new OpenAIApi(configuration);

async function translator(text) {
  await delay(5000);
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
          content: `Convert '${text}' to marathi letters excludes numbers.`,
        },
      ],
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

module.exports = translator;
