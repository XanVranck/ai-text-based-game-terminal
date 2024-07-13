import inquirer from 'inquirer';
import callOpenAI from './openai.js';
import { Spinner } from "@topcli/spinner";

let chosenScenarios = [];
const scenarios = [
    // Scenario 1: Introduction
    {
        name: 'intro',
        message: 'You wake up in a mysterious room. What do you do?',
        choices: [
            { name: 'Look around'},
            { name: 'Open the door'}
        ],
        continue: true
    },
    // Scenario 7: Conclusion
    {
        name: 'ending',
        message: 'Congratulations! You have completed the adventure.',
        choices: []
    }
];

// Function to present a scenario and get player choice
const presentScenario = async (scenario) => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: scenario.message,
            choices: scenario.choices.map(choice => choice.name),
        }
    ]);
    return answers.choice;
};

// Function to start the game
const startGame = async () => {
    // Start with the 'intro' scenario
    let currentScenario = scenarios.find(scenario => scenario.name === 'intro');
    let count = 0;

    // Continue looping through scenarios as long as there's a current scenario
    while (currentScenario.continue) {
        // Present the current scenario to the player and get their choice
        count++;
        const playerChoice = await presentScenario(currentScenario);
        chosenScenarios.push(currentScenario.message)
        const spinner = new Spinner().start("Generating");
        currentScenario = await callOpenAI(chosenScenarios, playerChoice, count)
        spinner.succeed("");
    }

    // Print a thank-you message when the game ends
    console.log('Thanks for playing! Goodbye.');
};

// Start the game by calling the startGame function
startGame();