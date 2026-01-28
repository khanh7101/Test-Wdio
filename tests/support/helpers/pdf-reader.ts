import fs from 'fs'

// pdf-parse uses CommonJS export, need to use require
const pdfParse = require('pdf-parse')

/**
 * PDF Reader Utility
 *
 * Read and extract text from PDF files
 */

/**
 * Read PDF file and extract all text
 *
 * @param filePath - Absolute path to PDF file
 * @returns Extracted text from PDF
 *
 * @example
 * const text = await readPDF('./documents/invoice.pdf')
 * console.log(text)
 */
export async function readPDF(filePath: string): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath)
    const data = await pdfParse(dataBuffer)
    return data.text
}

/**
 * Read PDF file and get detailed information
 *
 * @param filePath - Absolute path to PDF file
 * @returns PDF data including text, pages, metadata
 */
export async function readPDFDetails(filePath: string): Promise<{
    text: string
    numpages: number
    info: any
    metadata: any
    version: string
}> {
    const dataBuffer = fs.readFileSync(filePath)
    const data = await pdfParse(dataBuffer)

    return {
        text: data.text,
        numpages: data.numpages,
        info: data.info,
        metadata: data.metadata,
        version: data.version,
    }
}

/**
 * Search for text in PDF
 *
 * @param filePath - Absolute path to PDF file
 * @param searchText - Text to search for
 * @returns True if text is found
 */
export async function searchInPDF(
    filePath: string,
    searchText: string
): Promise<boolean> {
    const text = await readPDF(filePath)
    return text.includes(searchText)
}

/**
 * Extract text from specific page
 *
 * @param filePath - Absolute path to PDF file
 * @param pageNumber - Page number (1-indexed)
 * @returns Text from specified page
 */
export async function readPDFPage(
    filePath: string,
    pageNumber: number
): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath)
    const data = await pdfParse(dataBuffer, {
        max: pageNumber,
    })

    // This is a simplified version - actual page extraction is more complex
    const lines = data.text.split('\n')
    const linesPerPage = Math.ceil(lines.length / data.numpages)
    const startLine = (pageNumber - 1) * linesPerPage
    const endLine = pageNumber * linesPerPage

    return lines.slice(startLine, endLine).join('\n')
}
