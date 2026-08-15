// Instructions to generate PDF from resume.html
// 
// METHOD 1: Using Browser (Easiest)
// 1. Open resume.html in your web browser
// 2. Press Ctrl+P (or Cmd+P on Mac) to open Print dialog
// 3. Select "Save as PDF" or "Microsoft Print to PDF"
// 4. Set margins to "None" for best results
// 5. Save the file as "Yohannis-Mesfin-Resume.pdf"
//
// METHOD 2: Using Online Tool
// 1. Go to https://www.html2pdf.com or https://pdfcrowd.com
// 2. Upload the resume.html file
// 3. Download the generated PDF
// 4. Rename to "Yohannis-Mesfin-Resume.pdf"
//
// METHOD 3: Using Node.js (for developers)
// Run: npm install puppeteer
// Then run this script: node generate-pdf.js

const fs = require('fs');
const path = require('path');

// Check if puppeteer is available
try {
    const puppeteer = require('puppeteer');
    
    (async () => {
        console.log('Generating PDF resume...');
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Load the HTML file
        const htmlPath = path.join(__dirname, 'resume.html');
        await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
        
        // Generate PDF
        await page.pdf({
            path: 'Yohannis-Mesfin-Resume.pdf',
            format: 'A4',
            printBackground: true,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        });
        
        await browser.close();
        console.log('✓ PDF generated successfully: Yohannis-Mesfin-Resume.pdf');
    })();
    
} catch (error) {
    console.log('\n==============================================');
    console.log('Puppeteer not installed.');
    console.log('==============================================\n');
    console.log('EASY METHOD: Generate PDF using your browser:');
    console.log('1. Open resume.html in Chrome, Firefox, or Edge');
    console.log('2. Press Ctrl+P (Windows) or Cmd+P (Mac)');
    console.log('3. Choose "Save as PDF"');
    console.log('4. Set margins to "None"');
    console.log('5. Save as "Yohannis-Mesfin-Resume.pdf"');
    console.log('\nOR install puppeteer: npm install puppeteer');
    console.log('==============================================\n');
}
