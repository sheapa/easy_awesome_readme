const axios = require('axios');

const api = {
  getUser(answers) {
    axios.get(`https://api.github.com/users/${answers.gitName}`).then(function(res){
      const { gitData } = res.data;

      console.log(res.data);
    });
  }
};

module.exports = api;
