const axios = require("axios");
const cheerio = require("cheerio");
const cleaner = require("clean-html");
const fs = require("fs");
const sh = require("shelljs");

const rate  = 2000 // in milliseconds
const throttle = require('promise-ratelimit')(rate)

async function queryExampleApi () {
  await throttle()
  var response = await get('https://api.example.com/stuff')
  return response.body.things
}


let globalState = {
  mainURL: "http://www.explodingdog.com/"
};

async function updateGlobalState(newState) {
  globalState = Object.assign({}, globalState, newState);
}

async function getCleanDOM(url) {
  this.siteRequest = await axios.get(url);
  this.siteURLHTML = this.siteRequest.data;

  cleaner.clean(this.siteURLHTML, html => {
    this.siteURLHTMLClean = html;
  });

  this.siteURLDOM = cheerio.load(this.siteURLHTMLClean);

  return this.siteURLDOM;
}

async function buildYearList(globalState) {
  this.years = [];
  this.mainURLDOM = await getCleanDOM(globalState.mainURL);

  this.mainURLDOM(".drawings ol li a").each((idx, item) => {
    this.years.push(this.mainURLDOM(item).text());
  });

  await updateGlobalState({ years: this.years });
}

async function getPaintingsforYear(year) {
  this.yearURLDOM = await getCleanDOM(globalState.mainURL + year + ".html");
  this.currentYearData = {};
  let $ = this.yearURLDOM;
  let days = $(".day");

  $(days).each((idx, day) => {
    const date = $(day)
      .find("h3")
      .text();
    this.currentYearData[date] = [];

    // NEED TO CHECK FOR JPGS TOO
    $(day)
      .find("a")
      .each((indx, paintingLink) => {
        this.currentYearData[date].push(
          (globalState.mainURL + $(paintingLink).attr("href"))
            .split("//title")
            .join("/drawing")
            .replace(".html", ".png")
        );
      });
  });

  let newYDObj = {};
  newYDObj[year] = this.currentYearData;

  return newYDObj;
}

async function buildPaintingsDirectory(globalState) {
  this.paintingYears = {};
  const paintingYearsData = await globalState.years.map(async year => {
    return (this.paintingYears[year] = await getPaintingsforYear(year));
  });
  return Promise.all(paintingYearsData).then(async completed => {
    await updateGlobalState({ yearsData: completed });
    return;
  });
}

async function remapFileExtensions(globalState) {
  globalState.yearsData.map(async yearObj => {
    // Create folder for year
      // Create folder for day
      // Check if file is good
      // Save file or try again with other file type (recursive)    
   
    return (this.paintingYears[year] = await getPaintingsforYear(year));
  });
  globalState.yearsData.map
  

  return this.siteURLDOM;
}

async function runScrape() {
  await Promise.all([
    await buildYearList(globalState),
    await buildPaintingsDirectory(globalState)
  ]).then(async done => {
    console.log(globalState);
    fs.writeFile(
      "EDSitemap.json",
      JSON.stringify(globalState.yearsData, null, 4),
      function(err) {
        console.log(
          "File successfully written! - Check your project directory for the EDSitemap.json file"
        );
      }
    );
  });
}

//runScrape();

async function getSiteMap () {
  sh.rm('-rf', 'pictures')

  const contents = fs.readFileSync('EDSitemap.json', 'utf8');
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
                  // console.log('SUCCESS');
                  // console.log(response.status);
                  // console.log('-----------');
                })
                .catch(async function (error) {
                  // console.log('ERROR');
                  // console.log(error.error);
                  // console.log('-----------');

                  // Throttle
                  await throttle()
                  const jpg = paintingURL.replace('.png','.jpg')
                  // const gif = paintingURL.replace('.png','.gif')

                  axios.get(jpg)
                      .then(function (response) {
                        // console.log('SUCCESS');
                        // console.log(response.status);
                        // console.log('-----------');
                      })
                      .catch(function (error) {
                        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXERROR');
                        console.log(jpg.replace('.jpg','.html'))
                        // console.log(error.error);
                        // console.log('-----------');
                      })
   
                });

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

getSiteMap()
