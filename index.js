// HELP BLOCK
if (process.argv.length <= 2) {
  console.log("-----------------------------------------------------------------------------------------");
  console.log("Usage: " + __filename.replace(__dirname, '').split('/')[1] + " `runscrape` or `getimages`");
  console.log("-----------------------------------------------------------------------------------------");
  console.log("     `runscrape` - will build a JSON file of the sitemap - ** RUN THIS FIRST **");
  console.log("     `getimages` - will lookup the URLs in the generated sitemap and download all images");
  console.log("-----------------------------------------------------------------------------------------");
  process.exit(-1);
}

// FLAG passed on CLI
const param = process.argv[2];

// Handle FLAG passed
switch (flag) {
  case 'runscrape':
    const runScrape = require('./utils/runScrape')
    runScrape()
    break;
  case 'getimages':
    const getSiteMap = require('./utils/getSiteMap')
    getSiteMap()
    break;
  default:
    break;
}
