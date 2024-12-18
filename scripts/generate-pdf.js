const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateInsuranceGuidePDF() {
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });

    // Create new page
    const page = await browser.newPage();

    // Get HTML template
    const templatePath = path.join(__dirname, '../templates/insurance-guide.html');
    const template = fs.readFileSync(templatePath, 'utf8');

    // Set content
    await page.setContent(template, {
      waitUntil: 'networkidle0'
    });

    // Add company logo
    await page.addStyleTag({
      content: `
        @page {
          margin: 40px;
        }
        .logo {
          content: url('data:image/png;base64,${fs.readFileSync(path.join(__dirname, '../images/logo.png')).toString('base64')}');
        }
      `
    });

    // Generate PDF
    const pdfPath = path.join(__dirname, '../public/downloads/insurance-guide.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '40px',
        right: '40px',
        bottom: '40px',
        left: '40px'
      }
    });

    // Close browser
    await browser.close();

    console.log('Insurance Guide PDF generated successfully!');
    return pdfPath;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

// Generate PDF on script run
if (require.main === module) {
  generateInsuranceGuidePDF().catch(console.error);
}

module.exports = generateInsuranceGuidePDF; 