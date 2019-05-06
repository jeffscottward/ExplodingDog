const buildYearList = require('./buildYearList')
const buildPaintingsDirectory = require('./buildPaintingsDirectory')
const fs = require('fs')
let globalState = require('./globalState')

module.exports = async function runScrape() {
  // Get all the Years
  const stateWithYears = await buildYearList(globalState)
  
  // Get all the art for all the years
  const paintingDirectoryMap = await buildPaintingsDirectory(stateWithYears)
  
  // Resolve the promises of promises of art
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