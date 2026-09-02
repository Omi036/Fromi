import { Manager } from "../../lib/classes/manager";
import puppeteer, {Browser} from "puppeteer";
import fs from "fs";
import path from "path";


interface PDFGenData {
    outputPath: string;
    pdfBuffer: Buffer;
}

class PDFGenManager extends Manager {
    static browser: Browser | null = null;


    static async init() {
        this.browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
    }


    static async generatePDF(templateName: string, data: Record<string, string>, width?: number, height?: number): Promise<PDFGenData> {
        if (!this.browser) {
            throw new Error("Browser not initialized. Call PDFGenManager.init() first.");
        }

        const page = await this.browser.newPage();
        
        const templatesPath = path.join(__dirname, "..", "..", "..", "src", 'routes', "pdftemplates");
        const templatePath = path.join(templatesPath, `${templateName}.html`);
        const storedPath = path.join(templatesPath, "output", `${templateName}-${Date.now()}.pdf`);
        const htmlContent = fs.readFileSync(templatePath, 'utf-8');

        // Replace placeholders with actual data
        let modifiedHtml = htmlContent;
        for (const [key, value] of Object.entries(data)) {
            modifiedHtml = modifiedHtml.replace(new RegExp(`{{${key}}}`, 'g'), value);
        }

        await page.setContent(modifiedHtml);
        const pdfBuffer = Buffer.from(await page.pdf({ width, height }));
        fs.writeFileSync(storedPath, pdfBuffer);

        await page.close();
        await this.browser.close();

        return { outputPath: storedPath, pdfBuffer };
    }

}

export { PDFGenManager, PDFGenData };