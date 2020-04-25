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
        choices: ["Installation","Usage","Contributing","Tests","Questions"]
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
    },
    {
        type: "input",
        name: "tests",
        message: "Enter your tests:"
    },
    {
        type: "inqut",
        name: "questions",
        message: "Enter your questions:"
    }
];
// -- They give us a writeToFile() FUNCTION, Looks like we may need to read/write to a file. What BUILT-IN node module will help us out with this (?) -- // 
function writeToFile(fileName, data) {
    fs.writeFile(fileName,data);
}

// -- This is a fairly common programming construct. They are just giving us a FUNCTION to INITIALIZE or SETUP our project parameter. It's also where we usually kick off our project flow -- //
function init() {
    inquirer.prompt(questions).then(data => {
        const projectTitle = data.title;
        const projectDesc = data.description;
        const projectLic = data.license;
        const options = data.sections;

        //Code for asking the optional questions
        const extraQuestions = [];
        optionalQuestions.map(question => {
            const questionName = question.name.replace(question.name.charAt(0),questions.name.toUpperCase().charAt(0));
            if(options.findIndex(questionName) !== -1)
            {
                extraQuestions.push(questionName)
            }

        });
        inquirer.prompt(extraQuestions).then(extraData => {
            //Title is on top
            let docText = "";
            docText += `${projectTitle}\r\n`;

            //Followed by the TOC
            docText += `Table of Contents: \r\n -Description \r\n`;
            options.map(option =>{
                docText += `-${option}\r\n`;
            });
            docText += `-License \r\n`;
            docText += `\r\n`;

            //And a description
            docText += `Description: ${projectDesc}\r\n`;

            if(options.includes("Installation"))
            {
                docText += `Installation instructions: \r\n ${extraData.installation}\r\n`;
            };

            if(options.includes("Usage"))
            {
                docText += `Usage instructions: \r\n ${extraData.usage}\r\n`;
            }

            if(options.includes("Contributing"))
            {
                docText += `Contribution instructions: \r\n ${extraData.contributing} \r\n`;
            }

            if(options.includes("Tests"))
            {
                docText += `Tests: \r\n ${extraData.tests} \r\n`;
            }

            if(options.includes("Questions"))
            {
                docText += `Questions: \r\n ${questions} \r\n`;
            }

            docText += `License: \r\n ${projectLic}\r\n`;
            writeToFile(`${projectTitle}.doc`,docText);
        })
    });
}

// -- We DEFINED our INITALIZATION FUNCTION above, here we are just kicking off (running) our program. -- // 
init();
