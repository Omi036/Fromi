# PDF Generator Manager

## Overview

**Description**: Provides a custom pdf generator using puppeteer  
**In** `src/managers/pdfgen/pdfgenManager.ts`  
**On Init:** Initializes asynchronously the browser  
**Provides**:
```ts
// Initializes the browser
PDFGenManager.init(): Promise<void>
// Generates a pdf given the template and the replaces value
APIManager.generatePDF(templateName: string, data: Record<string, string>, width?: number, height?: number): Promise<PDFGenData>

// Interface that contains the path and buffer of the generated pdf
interface PDFGenData {
    outputPath: string;
    pdfBuffer: Buffer;
}

```

<br/>

### Fields

#### Methods
[`init()`](https://fromi.readthedocs.io/en/latest/managers/pdfgen.html#pdfgenmanager-init-promise-void)  
[`generatePDF()`](https://fromi.readthedocs.io/en/latest/managers/pdfgen.html#pdfgenmanager-generatepdf-string-data-record-string-string-number-number-void)  

#### Exports
`PDFGenManager`
`PDFGenData`

<br/>

### Docs

#### Methods

#### `PDFGenManager.init(): Promise<void>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Initializes the Puppeter browser.


#### `APIManager.generatePDF(templateName: string, data: Record<string, string>, width?: number, height?: number): Promise<PDFGenData>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Generates a pdf given the template name (name under /routes/pdftemplates/), the object containing the key to replace with its value, and the width and height of the pdf in pixels.

<br/>

### Examples
#### Generating a Simple PDF
Let's create a simple pdf that has a replaceable text inside!  
First we need to create the template that the pdf will be based on, we do this under `/routes/pdftemplates/TEMPLATENAME.html`.  
All the variables placed between `{{BRACKES_LIKE_THIS}}` will be replaced with your data object:

```{code-block} html
:caption: /routes/pdftemplates/example.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>This is an example</h1>
    <p>With a variable named {{MYNAME}}</p>
</body>
</html>
```
Now we have created the template with a replaceable variable `MYNAME`, now let's create the pdf:
```{code-block} js
:caption: /src/app.ts
import { PDFGenManager } from "../../managers/Pdfgen";

async main(){
    // lets initialize the engine
    await PDFGenManager.init()
    // now lets gen the pdf:
    await PDFGenManager.generatePDF("example", {MYVARIABLE: "John Doe"})
    // should be under /routes/pdftemplates/output/example-xxxxxxxx.pdf
}

main()
```