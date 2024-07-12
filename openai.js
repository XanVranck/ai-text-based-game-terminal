
import OpenAI from 'openai';

const openai = new OpenAI();

const callOpenAI = async function(scenarios, choice) {
    const prompt = "We are playing an adventure game, this is the context and previouses scenarios: " + scenarios 
    + ". This is what happened as last: " + choice
    + ". Can you add a new dilema with 2 options as a json in this form: "
    + "  { message: '{{message}}', choices: [{name: '{{option1}}'}, {name: '{{option2}}'}]}" 
    + ". where message is the message of the current adventure (a small explanation) and option 1 is the first option and option 2 the second option."
    + ". If you think you can end the adventure, you can just send back { message: 'ending' } ";
    const stream = await openai.beta.chat.completions.stream({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt  }],
        stream: true
    });

      const chatCompletion = await stream.finalChatCompletion();
      const json = chatCompletion.choices[0].message.content
      console.log(json);
      return JSON.parse(json);
}

export default callOpenAI 