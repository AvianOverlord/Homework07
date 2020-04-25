const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");


// -- They give us an ARRAY called 'questions' What could we do with this (?) -- //
const questions = [
    {
        type: "input",
        name:"title",
        message: "What is the title of your project?"
    },
    {
        type: "input",
        name: "description",
        message: "Enter a description of your project."
    },
    {
        type: "input",
        name: "license",
        message: "What is the license of this project?"
    },
    {
        type: "checkbox",
        name: "sections",
        message: "Which sections should be included in this readme?",
        choices: ["Installation","Usage","Contributing","Tests","Questions"];
    }
];

const optionalQuestions = [
    {
        type: "input",
        name: "installation",
        message: "Enter installation instructions:"
    },
    {
        type: "input",
        name: "usage",
        message: "Enter usage instructions:"
    },
    {
        type: "input",
        name: "contributing",
        message: "Enter contributing instructions:"
    }
];
// -- They give us a writeToFile() FUNCTION, Looks like we may need to read/write to a file. What BUILT-IN node module will help us out with this (?) -- // 
function writeToFile(fileName, data) {
}

// -- This is a fairly common programming construct. They are just giving us a FUNCTION to INITIALIZE or SETUP our project parameter. It's also where we usually kick off our project flow -- //
function init() {
    inquirer.prompt(questions).then(data => {

    });
}

// -- We DEFINED our INITALIZATION FUNCTION above, here we are just kicking off (running) our program. -- // 
init();
