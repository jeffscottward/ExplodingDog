const fs = require('fs')
const sh = require('shelljs')

module.exports = async function getSiteMap () {
  sh.rm('-rf', 'pictures')

  const contents = fs.readFileSync('EDSitemap.json', 'utf8')
  const contentsJSON = JSON.parse(contents)
  const picDir = 'pictures'
  
  sh.mkdir(picDir)
  sh.cd(picDir)
  contentsJSON.forEach((yearOBJ) => {
    
    Object.keys(yearOBJ).map((yearKey) => {
      sh.mkdir(yearKey)
      sh.cd(yearKey)

      let dayObj = yearOBJ[yearKey]
      Object.keys(dayObj).map((dayKey) => {
        sh.mkdir(dayKey)
        sh.cd(dayKey)

        // Request FILE
        // Check if file is good
        // Save file or try again with other file type (recursive)
        let paintingsListObj = dayObj[dayKey]
        paintingsListObj.map((paintingURL) => {

          axios.get(paintingURL)
                .then(function (response) {
                  // console.log('SUCCESS')
                  // console.log(response.status)
                  // console.log('-----------')
                })
                .catch(async function (error) {
                  // console.log('ERROR')
                  // console.log(error.error)
                  // console.log('-----------')

                  // Throttle
                  await throttle()
                  const jpg = paintingURL.replace('.png','.jpg')
                  // const gif = paintingURL.replace('.png','.gif')

                  axios.get(jpg)
                      .then(function (response) {
                        // console.log('SUCCESS')
                        // console.log(response.status)
                        // console.log('-----------')
                      })
                      .catch(function (error) {
                        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXERROR')
                        console.log(jpg.replace('.jpg','.html'))
                        // console.log(error.error)
                        // console.log('-----------')
                      })
   
                })

          // console.log(paintingsList)
          // paintingsList.forEach((url) => {
          //   console.log(url)
          // })

          // fs.writeFile(filepath, fileContent)
        })
        sh.cd('..')
      })
      sh.cd('..')
    })
  })
}