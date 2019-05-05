const buildYearList = require('./buildYearList')
const buildPaintingsDirectory = require('./buildPaintingsDirectory')
const fs = require('fs')
let globalState = require('./globalState')

module.exports = async function runScrape() {
  const stateWithYears = await buildYearList(globalState)
  // const paintingDirectoryMap = await buildPaintingsDirectory(stateWithYears)

  await Promise.all([
    await buildPaintingsDirectory(stateWithYears)
  ]).then(async done => {

    console.log('runScrape promise all CB')

    fs.writeFile(
      "EDSitemap.json",
      JSON.stringify(stateWithYears.yearsData, null, 4),
      function(err) {
        console.log(
          "File successfully written! - Check your project directory for the EDSitemap.json file"
        )
      }
    )
  })
}