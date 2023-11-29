// llms (Large language Models)
const { OpenAI } = require('langchain/llms/openai');
const { PromptTemplate } = require('langchain/prompts');
const inquirer = require('inquirer');
require('dotenv').config();

const topics = 'Programming, Computer Science, Mathmatics, Artificial Intelligence';


// The rule the transformer has to abide by using few-shot-prompting technique
const promptMessage = `
You are a tech expert and will answer the users question thoroughly about anything related to ${topics}, and so on.

If the question is not related to ${topics}, or anything tech related say "Sorry your response has to be related to ${topics}"\n

Question: {question}
`;


// Instantiating a new AI Large Learning Model / Transformer Model
const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    maxTokens: 200,
    modelName: 'gpt-3.5-turbo'
})


// Creating a prompt for the Transformer Model to abide by and passing in user data
const prompt = new PromptTemplate({
    template: promptMessage,
    inputVariables: ['question'],
})


// Generates and logs the Transformer Models Response
async function generateResponse(userQuestion) {
    try {
        const modelResponse = await prompt.format({ question: userQuestion });
        const res = await model.call(modelResponse);
        console.log(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}


// Prompting for User input
const init = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Hello! I am your Personal Tech Assistant. You can Ask me anything about Tech!:\n\n'
        }
    ])
    .then(async (res) => {
        if(res.name != 'quit') {
            try {
                const response = await generateResponse(res.name);
                init();
            }
            catch(error) {
                console.log(error);
            }
        }
        else return;
    })
}

init();