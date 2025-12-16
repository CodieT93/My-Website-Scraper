Interactive Web Scraper Service
A simple, interactive Node.js tool to download full websites locally. This tool uses Puppeteer to render JavaScript-heavy sites (like Shopify or Single Page Applications) before saving them, ensuring that dynamic content, images, and styles are captured correctly.

Prerequisites
Node.js installed on your machine.

Installation
Open your terminal in the project folder.

Install the dependencies:

Bash

npm install
How to Use
Run the scraper script:

Bash

node scraper.js
Follow the interactive prompts:

URL: Paste the full website URL (e.g., https://codie.codes).

Folder Name: Enter a name for the output folder (or press Enter to use the default).

Wait for the process to complete. The script will launch a hidden browser to render the page and download assets.

Once finished, open the newly created folder and double-click index.html to view the offline site.

Configuration
The script is currently configured with the following settings in scraper.js:

Recursive: Yes (downloads linked pages).

Max Depth: 2 (prevents downloading the entire internet).

Plugin: Puppeteer (headless Chrome) to handle dynamic content and lazy loading.

Troubleshooting
"PuppeteerPlugin is not a constructor": Ensure you are using .default in your require statements if using CommonJS.

Timeout Error: If a site is very large, you may need to increase the timeout value in the scrollToBottom settings within scraper.js.
