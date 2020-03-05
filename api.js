const axios = require('axios');

// Call to github api. Returned as object for use in index.
const api = {
  getUser(answers) {
    return axios.get(`https://api.github.com/users/${answers.gitName}`);
  }
};

module.exports = api;
