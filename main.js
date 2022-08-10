const config = require('./config')
const puppeteer = require('puppeteer')


const goToPage = async (page, URL) => {
    console.log('Navigating to page: ', URL)
    return await page.goto(URL, {
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
        subreddits,
        getBaseURL
    } = SITES.Reddit

    const urlQueue = []
    const resultSet = []

    subreddits.forEach((sub) => {
        if (sub.keywords.length) {
            return sub.keywords.map(keyword => {
                const payload = {
                    ...sub,
                    keyword,
                    url: getBaseURL({
                        ...sub,
                        keyword
                    })
                }
                delete payload.keywords
                urlQueue.push(payload)
            })
        } else {
            const payload = {
                ...sub,
                keyword: null,
                url: getBaseURL({
                    ...sub
                })
            }
            delete payload.keywords
            urlQueue.push(payload)
        }
    })

    const browser = await puppeteer.launch(PUPPETEER)
    for(let i = 0; i < urlQueue.length; i++) {
        const { url, ...rest } = urlQueue[i]
        const page = await browser.newPage()
        await goToPage(page, url)
        const results = await grabAnchorNodes(page)
        resultSet.push({
            ...rest,
            url,
            results
        })
    }
    console.log({resultSet})
    browser.close()
}

main()