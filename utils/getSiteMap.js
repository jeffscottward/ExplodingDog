const fs = require('fs')
const sh = require('shelljs')
const axios = require('axios')

const PICDIR = 'drawings'

function makeAndEnterFolder(folderName) {
  sh.mkdir(folderName)
  sh.cd(folderName)
}

function retreiveSiteMap(path) {
  const contents = fs.readFileSync(path, 'utf8')
  const contentsJSON = JSON.parse(contents)
  return contentsJSON
}

function recycle(folderName) {
  sh.rm('-rf', folderName)
}

function backOneFolderLevel() {
  sh.cd('..')
}

module.exports = async function getSiteMap () {
  recycle(PICDIR)
  makeAndEnterFolder(PICDIR)
  
  const siteMap = retreiveSiteMap('../EDSitemap.json', 'utf8')
  siteMap.forEach((yearOBJ) => {
    
    // For each year
    Object.keys(yearOBJ).map((yearKey) => {
      
      makeAndEnterFolder(yearKey)
      let dayObj = yearOBJ[yearKey]

      // For each day of year
      Object.keys(dayObj).map((dayKey) => {

        makeAndEnterFolder(dayKey)
        let paintingsListObj = dayObj[dayKey]

        // For each art of day
        paintingsListObj.map((paintingURL) => {

          // TODO - Skip gifs for now - erroring weird
          if (paintingURL !== null && !paintingURL.includes('.gif')) {

            // Get and save art image to correct folder 
            axios({
              url: paintingURL,
              responseType: 'stream',
            }).then(response => {
              const fileName = response.config.url.split('/drawing/')[1]
              response.data.pipe(
                fs.createWriteStream(
                  (sh.pwd().stdout + '/' + yearKey + '/' + dayKey + '/' + fileName)
                )
              )
            }).catch(error => ({
              status: false,
              error: 'Error: ' + error.message,
            }));
          }
        })
        backOneFolderLevel()
      })
      backOneFolderLevel()
    })
  })
}