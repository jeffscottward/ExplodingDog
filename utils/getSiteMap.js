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
        
        // Request FILE
        // Check if file is good
        // Save file or try again with other file type (recursive)
        let paintingsListObj = dayObj[dayKey]
        paintingsListObj.map((paintingURL) => {
          if (paintingURL !== null) {
            axios.get(paintingURL)
              .then((response) => {
                fs.writeFile(
                  response.config.url.split('/drawing/')[1],
                  response.data,
                  (err) => {
                    if (err) throw err;
                    console.log('IMAGE saved!');
                });
              })
              .catch((error) => {
                console.log({ error })
              })
          }
        })
        backOneFolderLevel()
      })
      backOneFolderLevel()
    })
  })
}