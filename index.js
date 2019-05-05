// const rate  = 2000 // in milliseconds
// const throttle = require('promise-ratelimit')(rate)
// async function queryExampleApi() {
//   await throttle()
//   var response = await get('https://api.example.com/stuff')
//   return response.body.things
// }

const runScrape = require('./utils/runScrape')
// const getSiteMap = require('./utils/getSiteMap')
runScrape()
// getSiteMap()
