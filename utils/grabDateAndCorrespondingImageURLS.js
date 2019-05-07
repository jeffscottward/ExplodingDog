const getPaintingImageLink = require('./getPaintingImageLink')

module.exports = async function grabDateAndCorrespondingImageURLS($, days, globalState) {
  let currentYearData = {}
  let promises = [];

  // Build a map of promise arrays of art from passed html pages
  async function getAllArtForThisDay(pageLink, date, currentYearData) {
    let imgLink = await getPaintingImageLink(pageLink)
    currentYearData[date].push(imgLink)
  }

  // Build promise array for pages for each day
  $(days).each((idx, day) => {
    const date = $(day).find('h3').text()
    currentYearData[date] = []

    // Push the page URL into the promises array
    $(day)
      .find('a')
      .each(async (indx, paintingPageLink) => {
        let pageLink = (globalState.mainURL + paintingPageLink.attribs.href).replace('//title', '/title')
        promises.push(getAllArtForThisDay(pageLink, date, currentYearData));
      })
  })
  
  // Resolve all art promises and return 
  return Promise.all(promises)
    .then((links) => {return currentYearData})
    .catch((e) => {console.log('ERROR')})
}