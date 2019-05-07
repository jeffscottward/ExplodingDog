(async function steps() {
  const runScrape = require('./utils/runScrape')
  const getSiteMap = require('./utils/getSiteMap')
  // await runScrape()
  await getSiteMap()  
})()
