
const axios = require('axios');
let querystring = require('querystring');

// const units  = '&units=imperial';
// const _baseURL = 'https://tangoflask.herokuapp.com/crawler';
const _baseURL = 'http://127.0.0.1:5000/add';

const config = {
    //method: 'get',
    url: _baseURL,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    responseType: 'json',
    withCredentials: false,
    // headers: {
    //   'content-type': 'application/json;charset=UTF-8'
    // },
  }


function startCrawler(site, pages, word, type) {
  console.log(site, pages, word, type)

  axios.post('http://127.0.0.1:5000/crawler',
    querystring.stringify({
      startUrl: site,
      maxPages: pages,
      keyword: word,
      searchType: type
    }),
    {
      headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded'},
      responseType: 'json'
    })

    .then(function(response) {
      console.log(response.data)
      return 'crawled'
    })
    .catch(function(error) {
      console.log(error)
      return 'error'
    })


  // return axios.get(config)
  //   .then(function (response) {
  //     console.log(response.data)
  //     return 'startCrawler returned';
  //   });
}

module.exports = {
  startCrawler
};
