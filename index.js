const inquirer = require('inquirer');
const util = require('util');
const fs = require('fs');
const api = require('./api')

// Make fs.writefile a promise using promisfy from util.
const writeFileAsync = util.promisify(fs.writeFile);

// User prompt for Git username and other . Via Inquierer
function promptUser() {
    return inquirer.prompt([
        {
          type: 'input',
          name: 'gitName',
          message: 'What is your git user name?'
        },
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of your project?'
        },
        {
          type: 'input',
          name: 'description',
          message: 'Please breifly describe your project.'
        },
        {
          type: 'input',
          name: 'instructions',
          message: 'What are you program instructions?'
        },
        {
          type: 'input',
          name: 'liscenses',
          message: 'Please provide liscense information.'
        },
        {
          type: 'input',
          name: 'tests',
          message: 'Provide details on your tests and how to run them.'
        },
        {
          type: 'input',
          name: 'acknowledgments',
          message: 'This is the place to list any special shout outs to others that made this project possible.'
        }

    ]);
}

// Feeds data into README.MD text format using tempelate literal values from answers & data pulled from GitHub.
async function generateREADME(answers) {
  // Cannot acces answers until inquirer prompt and api callback are completed
  const fullData = await api.getUser(answers);

  
    return ` 
    
# ${answers.title}

${answers.description}

<!-- Animated Gif Here -->

## Usage

${answers.instructions}


## Running the tests

${answers.tests}

## Author

#${fullData.data.name} 
<img src="${fullData.data.avatar_url}" alt="Author Picture" width="150">
Git: ${fullData.data.login} | email: ${fullData.data.email}

## License

${answers.liscenses}

## Acknowledgments

${answers.acknowledgements}

## Badges
    
    `;
}

// Async init function for instructing stack on how to fulfill the writeFile promise.
async function init() {
    try {
        // Answers not avialable until after inquierer prompt.
        const answers = await promptUser();
        // Cannot create text for readme, unitl after answers and api data are made available and fead into readme template. 
        const text = await generateREADME(answers);
        // Readme file will be written to file system using data from text variable and the async promis wll be fullfilled.
        await writeFileAsync("README.md", text);
        // Console log success when readme is written to filesystem. Othewise error.
        console.log("Successfully wrote to README.md");
      } catch(err) {
        console.log(err);
      }
  }
  // Initiates process.
  init();
  