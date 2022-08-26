const puppeteer = require('puppeteer')
const yaml = require('js-yaml')
const fs = require('fs')
require('dotenv').config();
const emailService = require('./services/email')

class Script {
    constructor({siteConfigYamlPath, puppeteerConfig}) {
        this.siteConfigYamlPath = siteConfigYamlPath
        this.puppeteerConfig = puppeteerConfig,
        this.emailService = emailService
    }

    async initPuppeteer() {
        return puppeteer.launch({
            ...this.puppeteerConfig,
            args: [
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--disable-setuid-sandbox",
                "--no-sandbox"
            ]
        })
    }

    async browserGoToPage (page, url) {
        console.log('Navigating to page: ', url)
        return await page.goto(url, {
            waitUntil: 'networkidle2'
        })
    }

    async readYaml(path) {
        try {
            let fileContents = await fs.readFileSync(path, 'utf8');
            let data = await yaml.load(fileContents);
            return data
        } catch (e) {
            console.log(e);
        }
    }
    
    async doScrapeSubReddits(browser) {
        const generateSubRedditURLMetadata = ({name, sort='', time='', keywords}) => {
            if (keywords.length) {
                return keywords.map(keyword => ({url: `https://www.reddit.com/r/${name}/search/?q=${keyword}&sort=${sort}&t=${time}`, subreddit:name }))
            } else {
                return [{url: `https://www.reddit.com/r/${name}/search/?&sort=${sort}&t=${time}`, subreddit:name }]
            }
        }

        const ingestYAMLFile = (file) => {
            const urls = [];
            const subreddits = file.sites.reddit;
            for (const sub in subreddits) {
                const subreddit = subreddits[sub]
                const subredditUrls = generateSubRedditURLMetadata({
                    name: sub,
                    sort: subreddit.sort,
                    time: subreddit.time,
                    keywords: subreddit.keywords || []
                }, subreddits)
                urls.push(...subredditUrls)
            }
            return [urls, subreddits]
        }

        const getArticlesFromDOM = async (page) => {
            console.log('>> Grabbing articles from DOM...')
            return await page.$$eval('a[data-click-id="body"]', anchors => {   
                return anchors.map(anchor => {
                    return {
                        href: anchor.href,
                        innerText: anchor.innerText
                    }
                })
            })
        }

        const file = await this.readYaml(this.siteConfigYamlPath)
        const [queue, subreddits] = await ingestYAMLFile(file)
        
        const result = await Promise.all([...queue.map(async ({url, subreddit}) => {
            const page = await browser.newPage()
            await this.browserGoToPage(page, url)
            console.log('>> URL', url)
            const articles = await getArticlesFromDOM(page)
            const subredditConfig = subreddits[subreddit]
            return {
                url,
                subreddit,
                ...subredditConfig,
                articles: articles.slice(0, subredditConfig?.limit || 7)
            }
        })])
        return result
    }

    async doEmailResults() {
        
    }

    async run()  {
        // Scrape subreddits & email results
        const browser = await this.initPuppeteer()
        const subredditResult = await this.doScrapeSubReddits(browser)
        // Terminate connection to Puppeteer
        browser.close()
        // Email results
        this.emailService.sendEmail({
            from: "from-example@email.com",
            to: "to-example@email.com",
            subject: `Subreddit Scraping: ${new Date().toLocaleDateString()}`,
            text: JSON.stringify(subredditResult)
        })
    }
}

const script = new Script({
    // eslint-disable-next-line no-undef
    siteConfigYamlPath: String(process.env.YAML_SITE_CONFIG_PATH),
    puppeteerConfig: {
        // eslint-disable-next-line no-undef
        headless: process.env.PUPPETEER_HEADLESS || false,
        // eslint-disable-next-line no-undef
        executablePath: String(process.env.PUPPETEER_EXECUTABLE_PATH) || null,
        // eslint-disable-next-line no-undef
        devtools: process.env.PUPPETEER_ENABLE_DEV_TOOLS || false
    }
})

script.run()