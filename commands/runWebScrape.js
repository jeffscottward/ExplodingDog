const fs = require('fs')
let globalState = require('../state/globalState')

const buildYearList = require('../runWebScrape/buildYearList')
const buildDrawingsDirectory = require('../runWebScrape/buildDrawingsDirectory')

module.exports = async function runScrape() {
  // Get all the possible years
  const stateWithYears = await buildYearList(globalState)
  
  // Get all the art for all the found years
  const drawingDirectoryMap = await buildDrawingsDirectory(stateWithYears)
  
  // Resolve the promises of promises of the art
  // Write result to file
  Promise.all(drawingDirectoryMap.drawings)
    .then((result) => {
      fs.writeFile(
        'EDSitemap.json',
        JSON.stringify(result, null, 4),
        (err) => {
          if (err) throw err
          console.log('EDSitemap.json written successfully')
        }
      )
    })
    .catch((err) => {
      if (err) throw err
      console.log('PROGRAM FAIL')
    })
}