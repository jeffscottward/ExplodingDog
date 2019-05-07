const runWebScrape = require('./commands/runWebScrape')
const runDownloadDrawings = require('./commands/runDownloadDrawings')

// HELP BLOCK
if (process.argv.length <= 2) {
  console.log("------------------------------------------------------------------------------------------------------");
  console.log("ExplodingDog.ai")
  console.log("------------------------------------------------------------------------------------------------------");
  console.log("Usage: " + __filename.replace(__dirname, '').split('/')[1] + " `run-web-scrape` or `run-download-drawings`");
  console.log("------------------------------------------------------------------------------------------------------");
  console.log("     `run-web-scrape` - will build a JSON file of the sitemap - ** RUN THIS FIRST **");
  console.log("     `run-download-drawings` - will lookup the URLs in the generated sitemap and download all images");
  console.log("------------------------------------------------------------------------------------------------------");
  process.exit(-1);
}

// FLAG passed on CLI
const param = process.argv[2];

// Handle FLAG passed
switch (param) {
  case 'run-web-scrape':
    runWebScrape()
    break;
  case 'run-download-drawings':
    runDownloadDrawings()
    break;
  default:
    break;
}
