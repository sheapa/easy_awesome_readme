const axios = require('axios');

const api = {
  getUser(answers) {
    return axios.get(`https://api.github.com/users/${answers.gitName}`);
  }
};

module.exports = api;
