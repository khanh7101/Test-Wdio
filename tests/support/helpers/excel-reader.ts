import ExcelJS from 'exceljs'

/**
 * Excel Reader Utility
 *
 * Read and parse Excel files (.xlsx, .xls)
 */

/**
 * Read Excel file and return data as array of objects
 *
 * @param filePath - Absolute path to Excel file
 * @param sheetName - Optional sheet name (uses first sheet if not provided)
 * @returns Array of parsed data
 *
 * @example
 * const data = await readExcel('./data/users.xlsx', 'Sheet1')
 * console.log(data[0].name)
 */
export async function readExcel(
    filePath: string,
    sheetName?: string
): Promise<any[]> {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)

    const worksheet = sheetName
        ? workbook.getWorksheet(sheetName)
        : workbook.worksheets[0]

    if (!worksheet) {
        throw new Error(`Worksheet "${sheetName || 'first sheet'}" not found`)
    }

    const data: any[] = []
    const headers: string[] = []

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
            // First row is headers
            row.eachCell((cell) => {
                headers.push(cell.value?.toString() || '')
            })
        } else {
            // Data rows
            const rowData: any = {}
            row.eachCell((cell, colNumber) => {
                const header = headers[colNumber - 1]
                if (header) {
                    rowData[header] = cell.value
                }
            })
            data.push(rowData)
        }
    })

    return data
}

/**
 * Read specific cell value from Excel
 *
 * @param filePath - Absolute path to Excel file
 * @param sheetName - Sheet name
 * @param cellAddress - Cell address (e.g., 'A1', 'B2')
 * @returns Cell value
 */
export async function readExcelCell(
    filePath: string,
    sheetName: string,
    cellAddress: string
): Promise<any> {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)

    const worksheet = workbook.getWorksheet(sheetName)
    if (!worksheet) {
        throw new Error(`Worksheet "${sheetName}" not found`)
    }

    const cell = worksheet.getCell(cellAddress)
    return cell.value
}

/**
 * Get all sheet names from Excel file
 *
 * @param filePath - Absolute path to Excel file
 * @returns Array of sheet names
 */
export async function getExcelSheetNames(filePath: string): Promise<string[]> {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)

    return workbook.worksheets.map((sheet) => sheet.name)
}
