# Puppeteer Email Blast

## What is this?

A project that leverages Puppeteer & Airflow to send a daily morning email with a curated list of stuffed scraped from Reddit. I automated the scraping using Puppeteer, saved the result set to MongoDB, and emailed a subscriber list the results.

## Technology

- Puppeteer
- Airflow

## Tasks

- [ ] Find best way to iterate through URLs and run Puppeteer script on each page
- [ ] Save results somewhere
- [ ] Setup a mailer using node module
- [ ] Send email to subscriber list
- [ ] Make a fancier HTML email template
