const getPaintingImageLink = require('./getPaintingImageLink')

module.exports = async function grabDateAndCorrespondingImageURL($, days, globalState) {
  var currentYearData = {}
  var promises = [];

  async function getAllArtForThisDay(pageLink, date, currentYearData) {
    var imgLink = await getPaintingImageLink(pageLink)
    currentYearData[date].push(imgLink)
  }

  // Build request list
  $(days).each((idx, day) => {
    const date = $(day).find('h3').text()
    currentYearData[date] = []

    $(day)
      .find('a')
      .each(async (indx, paintingPageLink) => {
        let pageLink = (globalState.mainURL + paintingPageLink.attribs.href).replace('//title', '/title')
        promises.push(getAllArtForThisDay(pageLink, date, currentYearData));
      })
  })
  
  return Promise.all(promises)
    .then((links) => {return currentYearData})
    .catch((e) => {console.log('ERROR')})
}