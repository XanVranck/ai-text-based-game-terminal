
import OpenAI from 'openai';

const openai = new OpenAI();

const callOpenAI = async function (scenarios, choice, turn) {
    const prompt = "We are playing an adventure game, this is the context and previouses scenarios: " + scenarios
        + ". This is what happened as last: " + choice
        + ". Can you add a new dilema with 2 options as a json in this form: "
        + "  { message: '{{message}}', choices: [{name: '{{option1}}'}, {name: '{{option2}}'}], continue: true}"
        + ". where message is the message of the current adventure (a small explanation) and option 1 is the first option and option 2 the second option."
        + ". Make sure the response is a correct JSON"
        + ". You can choose when and how to make an ending scenario"
        + ". If it is the last scenario, you should change {continue: false} in the json response.";
    const stream = await openai.beta.chat.completions.stream({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        stream: true
    });
        const chatCompletion = await stream.finalChatCompletion();
        const json = chatCompletion.choices[0].message.content
        
        return JSON.parse(json);
}

export default callOpenAI 