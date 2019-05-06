const buildYearList = require('./buildYearList')
const buildPaintingsDirectory = require('./buildPaintingsDirectory')
const fs = require('fs')
let globalState = require('./globalState')

module.exports = async function runScrape() {
  // OK
  const stateWithYears = await buildYearList(globalState)
  // console.log({stateWithYears})

  // NOT OK
  const paintingDirectoryMap = await buildPaintingsDirectory(stateWithYears)
  // console.log({paintingDirectoryMap})

  // FINALLY WRITE FILE
  // Promise.all(paintingDirectoryMap.yearsData).then(async value => {
  //   console.log('runScrape promise all CB')
  //   console.log({value})
    // fs.writeFile(
    //   "EDSitemap.json",
    //   JSON.stringify(stateWithYears.yearsData, null, 4),
    //   function(err) {
    //     console.log(
    //       "File successfully written! - Check your project directory for the EDSitemap.json file"
    //     )
    //   }
    // )
  // })
}