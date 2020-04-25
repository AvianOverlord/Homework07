const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");


// -- They give us an ARRAY called 'questions' What could we do with this (?) -- //
const questions = [
    {
        type: "input",
        name:"title",
        message: "What is the title of your project?",
        default: "New Project"
    },
    {
        type: "list",
        name: "git",
        message: "Does this project have a git repository?",
        choices: ["Yes","No"]
    },
    {
        type: "input",
        name: "description",
        message: "Enter a description of your project.",
        default: "It does stuff."
    },
    {
        type: "input",
        name: "license",
        message: "What is the license of this project?",
        default: "I dunno."
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
        message: "Enter your contact information:"
    }
];
// -- They give us a writeToFile() FUNCTION, Looks like we may need to read/write to a file. What BUILT-IN node module will help us out with this (?) -- // 
function writeToFile(fileName, data) {
    fs.writeFile(fileName,data);
    return;
}

// -- This is a fairly common programming construct. They are just giving us a FUNCTION to INITIALIZE or SETUP our project parameter. It's also where we usually kick off our project flow -- //
function init() {
    inquirer.prompt(questions).then(data => {
        const projectTitle = data.title;
        const projectDesc = data.description;
        const projectLic = data.license;
        let options = data.sections;

        let gitPresent;

        if(data.git === "Yes")
        {
            gitPresent = true;
        }
        else
        {
            gitPresent = false;
        }

        //Code for asking the optional questions
        const extraQuestions = [];
        for(let i = 0; i < optionalQuestions.length; i++)
        {
            let questionName = optionalQuestions[i].name;
            questionName = (questionName.charAt(0).toUpperCase() + questionName.slice(1));
            if(options.includes(questionName))
            {
                extraQuestions.push(optionalQuestions[i]);
            }
        }
        if(gitPresent)
        {
            const gitQuestion = {
                type: "input",
                name: "gitUsername",
                message: "What is your github user name?"
            };
            extraQuestions.push(gitQuestion);
        }
        inquirer.prompt(extraQuestions).then(extraData => {
            //Title is on top
            let docText = "";
            docText += `${projectTitle}\n\n`;

            //Followed by the TOC
            docText += `Table of Contents: \n-Description \n`;
            options.map(option =>{
                docText += `-${option}\n`;
            });
            docText += `-License \n`;
            docText += `\n`;

            //And a description
            docText += `Description:\n${projectDesc}\n\n`;

            if(options.includes("Installation"))
            {
                docText += `Installation instructions:\n${extraData.installation}\n\n`;
            };

            if(options.includes("Usage"))
            {
                docText += `Usage instructions:\n${extraData.usage}\n\n`;
            }

            if(options.includes("Contributing"))
            {
                docText += `Contribution instructions:\n${extraData.contributing}\n\n`;
            }

            docText += `License:\n${projectLic}\n\n`;

            if(options.includes("Tests"))
            {
                docText += `Tests:\n${extraData.tests}\n\n`;
            }

            if(options.includes("Questions"))
            {
                docText += `Questions:\n${extraData.questions}\n\n`;
            }

            if(gitPresent)
            {
                axios.get(`https://api.github.com/users/${extraData.gitUsername}`).then(gitPull =>{
                    docText += `GitHub Contact information: \n${gitPull.data.avatar_url}\n${gitPull.data.url}`;
                    console.log(docText);
                    writeToFile(`README.md`, docText);
                });
            }
            else
            {
                console.log(docText);
                writeToFile(`README.md`, docText);
            }
        });
    });
}

// -- We DEFINED our INITALIZATION FUNCTION above, here we are just kicking off (running) our program. -- // 
init();
