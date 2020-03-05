const inquirer = require('inquirer');
const util = require('util');
const fs = require('fs');
const api = require('./api')

// const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// User prompt for user name. Via Inquierer
function promptUser() {
    return inquirer.prompt([
        {
          type: 'input',
          name: 'gitName',
          message: 'What is your git user name?'
        },
        {
          type: 'input',
          name: 'TestQ',
          message: 'Wut is your answer?'
        }
        
    ]);
}

// Feeds data into README.MD text format using tempelate literal values from answers & data pulled from GitHub.
async function generateREADME(answers) {

  const test = await api.getUser(answers);

  console.log(test);
  
    return ` ${test.data.login} ${answers.TestQ}`;
}


async function init() {
    try {
        const answers = await promptUser();

        const text = await generateREADME(answers);
    
        await writeFileAsync("README.md", text);
    
        console.log("Successfully wrote to README.md");
      } catch(err) {
        console.log(err);
      }
  }
  
  init();
  