const buildYearList = require('./buildYearList')
const buildPaintingsDirectory = require('./buildPaintingsDirectory')
const fs = require('fs')
let globalState = require('./globalState')

module.exports = async function runScrape() {
  // Get all the possible years
  const stateWithYears = await buildYearList(globalState)
  
  // Get all the art for all the found years
  const paintingDirectoryMap = await buildPaintingsDirectory(stateWithYears)
  
  // Resolve the promises of promises of the art
  // Write result to file
  Promise.all(paintingDirectoryMap.yearsData)
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