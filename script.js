// llms (Large language Models)
const { OpenAI } = require('langchain/llms/openai');
const { PromptTemplate } = require('langchain/prompts');
const { StructuredOutputParser } = require('langchain/output_parsers');
const inquirer = require('inquirer');
require('dotenv').config();

// The rule the transformer has to abide by
const promptMessage = `You are a javascript expert and will answer the user’s coding questions thoroughly as possible if the question is not related to the topic of javascript respond with "Sorry Naz not related to Javascript"\n Question: {question}`;


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
    inputVariables: ['question']
})


// Generates and logs the Transformer Models Response
async function generateResponse(userQuestion) {
    try {
        const modelResponse = await prompt.format({ question: userQuestion });
        const res = await model.call(modelResponse);
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}


const d = StructuredOutputParser.fromNamesAndDescriptions({
    code: "Javascript code that answers the user's question",
    explanation: 'detailed explanation of the example code provided'
})





// generateResponse('Who invented JS?');

// Prompting for User input
// const init = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'name',
//             message: 'Ask a coding question: '
//         }
//     ])
//     .then(res => {
//     })
// }

// init();