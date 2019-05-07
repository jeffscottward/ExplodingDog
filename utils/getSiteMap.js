const fs = require('fs')
const sh = require('shelljs')
const axios = require('axios')

const picDir = 'drawings'

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
  recycle(picDir)
  makeAndEnterFolder(picDir)
  
  const siteMap = retreiveSiteMap('../EDSitemap.json', 'utf8')
  siteMap.forEach((yearOBJ) => {
    
    Object.keys(yearOBJ).map((yearKey) => {
      makeAndEnterFolder(yearKey)
      let dayObj = yearOBJ[yearKey]

      Object.keys(dayObj).map((dayKey) => {
        makeAndEnterFolder(dayKey)
        let paintingsListObj = dayObj[dayKey]
        paintingsListObj.map((paintingURL) => {
          if (paintingURL !== null && !paintingURL.includes('.gif')) {
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