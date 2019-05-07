# ExplodingDog
## About
##### This is a Node.js application that retreives all 3000+ pieces of art that have been created explodingdog.com, over the course of 15 years.
##### The code is well commented as it has several layers of promises that all eventually resolve to the top parent promise of all the years of art

## Running the app
_Make sure to have [Node.js](https://nodejs.org/en/download/package-manager/) (and npm) installed first_

#### Install the dependencies
```bash
npm i
```

_NOTE: These are *long* running async calls, **process may take a couple of minutes**. When done you will see an `EDSitemap.json` file appear._

#### Build the sitemap first
```bash
node index.js runscrape
```

#### Download all the images
```bash
node index.js getimages
```

