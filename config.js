module.exports = {
    PUPPETEER: {
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        devtools: true
    },
    SITES: {
        Reddit: {
            getBaseURL({name, sort='', t='', keyword=''}) {
                const URL = `https://www.reddit.com/r/${name}/search/?q=${keyword}&sort=${sort}&t=${t}`
                return URL
            },
            subreddits: [
                {
                    // Grab newest
                    name: "stoicism",
                    keywords: [],
                    limit: 5,
                    sort: 'new'
                },
                {
                    name: "hackernews",
                    keywords: ["TypeScript", "Python", "React",],
                    limit: 2,
                    sort: 'top',
                    t: 'month'
                 },
                {
                    name: "EatCheapAndHealthy",
                    keywords: ["Stew", "Carrots", "Salmon"],
                    limit: 3,
                    sort: 'relevance',
                    t: 'all'
                },
            ]
        }
    }
}