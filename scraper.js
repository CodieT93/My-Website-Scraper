const scrape = require('website-scraper').default;
const PuppeteerPlugin = require('website-scraper-puppeteer').default;
const inquirer = require('inquirer');

// This function handles the questions
async function startScraper() {
    
    console.clear();
    console.log("=== WEBSITE DOWNLOADER SERVICE ===\n");

    // 1. Ask the User for Inputs
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Enter the website URL to download:',
            validate: function(value) {
                // Simple check to make sure they typed something
                if (value.length > 0) return true;
                return 'Please enter a valid URL.';
            }
        },
        {
            type: 'input',
            name: 'folder',
            message: 'Enter the name for the output folder:',
            default: 'downloaded-site' // Default if you just hit Enter
        }
    ]);

    const targetUrl = answers.url;
    const outputFolder = `./${answers.folder}`;

    console.log(`\n🚀 Starting download for: ${targetUrl}`);
    console.log(`📂 Saving to: ${outputFolder}`);
    console.log("⏳ Please wait... (this may take a while)\n");

    // 2. Run the Scraper with User Inputs
    const options = {
        urls: [targetUrl],
        directory: outputFolder,
        recursive: true,
        maxDepth: 2, 
        
        sources: [
            { selector: 'img', attr: 'src' },
            { selector: 'link[rel="stylesheet"]', attr: 'href' },
            { selector: 'script', attr: 'src' }
        ],

        plugins: [ 
            new PuppeteerPlugin({
                launchOptions: { 
                    headless: "new",
                    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
                },
                scrollToBottom: { timeout: 10000, viewportN: 10 } 
            })
        ]
    };

    // 3. Execute
    try {
        await scrape(options);
        console.log(`\n✅ SUCCESS! Website saved to: ${outputFolder}`);
    } catch (error) {
        console.log(`\n❌ ERROR: ${error.message}`);
    }
}

// Start the app
startScraper();