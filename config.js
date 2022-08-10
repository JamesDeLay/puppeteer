module.exports = {
    PUPPETEER: {
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        devtools: true
    },
    SITES: {
        MAPS: {
            url: 'https://maps.org',
            keywords: ['DMT', 'Psilocybin', 'Ayahuasca'],
        },
        rBooks: {
            url: 'https://www.reddit.com/r/books/',
            keywords: ["Doors of Stone", "Winds of Winter", "Fantasy"],
            comments: "Sort by new - only 3 latest articles"
        },
        stocks: {
            
        }
    }
}