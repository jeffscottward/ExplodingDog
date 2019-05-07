# `ExplodingDog.ai`
#### A Node.js app to generate ExplodingDog art

### About

- This is a Node.js application that retreives all 3000+ pieces of art that have been created explodingdog.com, over the course of 15 years.
- The code is well commented as it has several layers of promises that all eventually resolve to the top parent promise of all the years of art

### TODO
- [x] Build:Sitemap of all the existing art
- [x] Build:Download-Script all of the art
- [ ] Learn:How-To-Build Machine Learning bot to generate new drawings
- [ ] Build:ML-Bot to generate new art
- [ ] Build:WebUI to click-trigger the generatation of new art (in the browser? - Tensorflow.js)
- [ ] Build/Find:Ecommerce-Stack in Node.js for buying canvas of generated art
- [ ] Build:Feature:WebUI+Backend - submit generated image for purchase to backend
- [ ] Build:Feature:WebUI - show previously purchased items in a gallery (to purchase again)
- [ ] Integrate Stripe (or other $ processor)

## Running the app
_Make sure to have [Node.js](https://nodejs.org/en/download/package-manager/) (and npm) installed first_

#### Install the dependencies
```bash
npm i
```

_NOTE: These are *long* running async calls, **process may take a couple of minutes**. When done you will see an `EDSitemap.json` file appear._

#### Build the sitemap first
```bash
node index.js runwebscrape
```

#### Download all the drawings
```bash
node index.js rundownloaddrawings
```

