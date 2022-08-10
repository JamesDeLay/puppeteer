const config = require('./config')
const puppeteer = require('puppeteer')


const goToPage = async (URL) => {
    console.log('Navigating to page: ', URL)
    await page.goto(URL, {
        waitUntil: 'networkidle2'
    })
}

const grabAnchorNodes = async (page) => {
    console.log('Grabbing anchor nodes...')
    return page.$$eval('a[data-click-id="body"]', async anchors => {
        const results = []
        await anchors.forEach(({
            innerText,
            href
        }) => {
            results.push({
                innerText,
                href
            })
        })
        return results
    })
}

const main = async () => {
    const {
        PUPPETEER,
        SITES
    } = config

    const {
        Reddit
    } = SITES
    // Reddit
    const {
        subreddits,
        getBaseURL
    } = Reddit

    const urlsToScrape = []

    subreddits.forEach((sub) => {
        if (sub.keywords.length) {
            return sub.keywords.map(keyword => {
                const payload = {
                    ...sub,
                    keyword,
                    url: getBaseURL({...sub, keyword})
                }
                delete payload.keywords
                urlsToScrape.push(payload)
            })
        } else {
            const payload = {
                ...sub,
                keyword: null,
                url: getBaseURL({...sub})
            }
            delete payload.keywords
            urlsToScrape.push(payload)
        }
    })

    console.log(urlsToScrape)
    
    return Promise.all([...urlsToScrape.map(url => {
        
    })])

    // const formattedURLs = await subreddits.map(async (sub) => {
    //     const URL = getBaseURL(sub)
    //     if (sub.keywords.length) {
    //         // Keyword logic
    //         const keywordResults = {}
    //         await sub.keywords.map(async keyword => {
    //             console.log('Current URL: ', URL)
    //             const subURL = `${URL}&q=${keyword}`
    //             page = await goToPage(subURL)
    //             keywordResults[keyword] = {
    //                 results: await grabAnchorNodes(page),
    //                 keyword
    //             }
    //         })
    //         return {
    //             ...sub,
    //             ...Object.values(keywordResults)
    //         }
    //     } else {
    //         console.log('Current URL: ', URL)
    //         page = await goToPage(URL)
    //         const results = await grabAnchorNodes(page)
    //         return {
    //             ...sub,
    //             ...results
    //         }
    //     }  
    // })
    // console.log({formattedURLs})


    // await page.goto('https://maps.org', {waitUntil: 'networkidle2'})
    // await page.click('.search-toggle')
    // await page.type('#search-form-1', 'DMT \n')
    // const anchors = await page.$$eval('div.jetpack-instant-search__search-results-primary', div => { 
    //     const children = div[0].childNodes

    // })
    // // await page.waitForTimeout(5000)
    // console.log({anchors})
    // await browser.close()
}

main()