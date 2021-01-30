const axios = require('axios');

const defineIntervalTime = minutes => Math.floor(1000 * 60 * minutes);

const wakeUp = api => {
  axios.get(api);
};

exports.herokuKeepAwake = () =>
  setInterval(() => {
    console.log('Tick tock');
    wakeUp('https://wika-cms.herokuapp.com/posts');
  }, defineIntervalTime(30));
