import fs from 'fs'
import csv from 'csv-parser'

/**
 * CSV Reader Utility
 *
 * Read and parse CSV files
 */

/**
 * Read CSV file and return data as array of objects
 *
 * @param filePath - Absolute path to CSV file
 * @returns Array of parsed data
 *
 * @example
 * const data = await readCSV<UserData>('./data/users.csv')
 * console.log(data[0].name)
 */
export async function readCSV<T = any>(filePath: string): Promise<T[]> {
    const results: T[] = []

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: T) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error))
    })
}

/**
 * Read CSV file with custom options
 *
 * @param filePath - Absolute path to CSV file
 * @param options - CSV parser options
 * @returns Array of parsed data
 */
export async function readCSVWithOptions<T = any>(
    filePath: string,
    options: any
): Promise<T[]> {
    const results: T[] = []

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv(options))
            .on('data', (data: T) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error))
    })
}
