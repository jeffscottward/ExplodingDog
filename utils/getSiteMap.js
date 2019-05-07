const fs = require('fs')
const sh = require('shelljs')

const picDir = 'pictures'

function makeAndEnterFolder(folderName) {
  sh.mkdir(folderName)
  sh.cd(folderName)
}

function retreiveSiteMap(name) {
  const contents = fs.readFileSync(name, 'utf8')
  const contentsJSON = JSON.parse(contents)
  return contentsJSON
}

function recycle(folderName) {
  sh.rm('-rf', folderName)
}

module.exports = async function getSiteMap () {
  recycle(picDir)
  makeAndEnterFolder(picDir)
  
  const siteMap = retreiveSiteMap('EDSitemap.json', 'utf8')
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
          
          axios.get(paintingURL)
                .then((response) => {console.log({response})})
                .catch((error) => {console.log({error})})
          
          // fs.writeFile(filepath, fileContent)
        })
        sh.cd('..')
      })
      sh.cd('..')
    })
  })
}