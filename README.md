# Puppeteer Email Blast
## What is this?

A project that leverages `puppeteer` & `nodemailer` to send a daily morning email with a curated list of stuffed scraped from Reddit.

## Technologies & Services
- `puppeteer`
- `nodemailer`
- MailTrap

## Development

 #### Example Result - Subreddits
 ```json
 [
  {
    "url": "https://www.reddit.com/r/stoicism/search/?&sort=new&t=null",
    "subreddit": "stoicism",
    "keywords": null,
    "limit": 5,
    "sort": "new",
    "time": null,
    "articles": [
      {
        "href": "https://www.reddit.com/r/Stoicism/comments/wxxbz0/why_is_virtue_the_highest_good/",
        "innerText": "Why is virtue the highest good?"
      },
      {
        "href": "https://www.reddit.com/r/Stoicism/comments/wxwdme/meditations_11_23_hays_translation/",
        "innerText": "Meditations 11. 23 (Hays translation)"
      },
      {
        "href": "https://www.reddit.com/r/Stoicism/comments/wxvai0/whats_something_you_want_to_do_better_today/",
        "innerText": "What's something you want to do better today? -- Marcus Bot Meditation"
      },
      {
        "href": "https://www.reddit.com/r/Stoicism/comments/wxuot3/today_i_beat_anxiety/",
        "innerText": "today i beat anxiety"
      },
      {
        "href": "https://www.reddit.com/r/Stoicism/comments/wxrft8/lets_discuss_meditations_which_translation_is_the/",
        "innerText": "Let's discuss Meditations (which translation is the best)"
      }
    ]
  }
 ]
 ```

## Links

- [MailTrap](https://mailtrap.io/)
- [use-nodemailer-to-send-emails-from-your-node-js-server](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/)
## Tasks

- [x] Find best way to iterate through URLs and run Puppeteer script on each page
- [ ] Save results somewhere
- [x] Test an email using nodemailer
- [ ] Send email to subscriber list
- [ ] Make an HTML email template
