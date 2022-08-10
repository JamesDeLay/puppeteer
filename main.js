const config = require('./config')
const puppeteer = require('puppeteer')

const {PUPPETEER, SITES} = config
const main = async () => {
    const browser = await puppeteer.launch(PUPPETEER)
    const page = await browser.newPage()
    await page.goto('https://maps.org', {waitUntil: 'networkidle2'})
    await page.click('.search-toggle')
    await page.type('#search-form-1', 'DMT \n')
    const anchors = await page.$$eval('div.jetpack-instant-search__search-results-primary', div => { 
        const children = div[0].childNodes
        
    })
    // await page.waitForTimeout(5000)
    console.log({anchors})
    // await browser.close()
}
main()


// ol.jetpack-instant-search__search-results-list .is-format-minimal