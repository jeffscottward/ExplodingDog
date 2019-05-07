const fs = require('fs')
const sh = require('shelljs')
const axios = require('axios')

// Destination Folder 
const PICDIR = 'drawings'

// Shell utilities
function makeAndEnterFolder(folderName) {
  sh.mkdir(folderName)
  sh.cd(folderName)
}
function recycle(folderName) {
  sh.rm('-rf', folderName)
}
function backOneFolderLevel() {
  sh.cd('..')
}

// Read sitemap(aka directory) from disk
function retreiveSiteMap(path) {
  const contents = fs.readFileSync(path, 'utf8')
  const contentsJSON = JSON.parse(contents)
  return contentsJSON
}

// Get and save art image to correct folder 
function saveFile(url, yearFolder, dayFolder){
  axios({
    url: url,
    responseType: 'stream',
  }).then(response => {
    const fileName = response.config.url.split('/drawing/')[1]
    response.data.pipe(
      fs.createWriteStream(
        (sh.pwd().stdout + '/' + yearFolder + '/' + dayFolder + '/' + fileName)
      )
    )
  }).catch(error => ({
    status: false,
    error: 'Error: ' + error.message,
  }));
}


module.exports = async function runDownloadDrawings () {
  // Start over w/ clean directory
  recycle(PICDIR)
  makeAndEnterFolder(PICDIR)
  
  // Get sitemap
  const siteMap = retreiveSiteMap('../EDSitemap.json', 'utf8')

  // Loop through array of year obj's
  siteMap.forEach((yearOBJ) => {
    
    // For each year
    Object.keys(yearOBJ).map((yearKey) => {
      
      makeAndEnterFolder(yearKey)
      let dayObj = yearOBJ[yearKey]

      // For each day of year
      Object.keys(dayObj).map((dayKey) => {

        makeAndEnterFolder(dayKey)
        let drawingsListObj = dayObj[dayKey]

        // For each art of day
        drawingsListObj.map((drawingURL) => {

          // TODO - Skip gifs for now - erroring weird
          if (drawingURL !== null && 
             !drawingURL.includes('.gif')) {
            saveFile(drawingURL, yearKey, dayKey)
          }
        })
        backOneFolderLevel()
      })
      backOneFolderLevel()
    })
  })
}