const getPaintingImageLink = require('./getPaintingImageLink')

module.exports = async function grabDateAndCorrespondingImageURL($, days, globalState) {
  var currentYearData = {}
  var promises = [];

  async function doSomeAsyncStuff(pageLink, date, currentYearData) {
    var imgLink = await getPaintingImageLink(pageLink)
    currentYearData[date].push(imgLink)
  }

  // Build request map
  $(days).each((idx, day) => {
    const date = $(day)
      .find('h3')
      .text()
    currentYearData[date] = []

    $(day)
      .find('a')
      .each(async (indx, paintingPageLink) => {
        let pageLink = (globalState.mainURL + paintingPageLink.attribs.href).replace('//title', '/title')
        promises.push(doSomeAsyncStuff(pageLink, date, currentYearData));
      })
  })
  
  Promise.all(promises)
    .then((links) => {
      console.log(currentYearData)
      return currentYearData
    })
    .catch((e) => {
      console.log('ERROR')
    });
}