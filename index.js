const axios = require('axios');
const inquirer = require('inquirer');
const util = require('util');
const fs = require('fs');

//const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
          type: 'input',
          name: 'gitName',
          message: 'What is your git user name?'
        }
        
    ]);
}

function generateREADME(answers) {
    return `${answers.gitName}`;
}

async function init() {
    try {
      const answers = await promptUser();
  
      const text = generateREADME(answers);
      console.log(text);
  
      await writeFileAsync("README.md", text);
  
      console.log("Successfully wrote to README.md");
    } catch(err) {
      console.log(err);
    }
  }
  
  init();
  