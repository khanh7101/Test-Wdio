#!/usr/bin/env ts-node

import { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } from 'fs';
import { join } from 'path';
import { logger } from './utils/logger';

/**
 * Report Cleanup Script
 * Removes old Allure reports based on retention policy
 */

const RETENTION_DAYS = parseInt(process.env.REPORT_RETENTION_DAYS || '30');
const REPORT_DIRS = ['allure-results', 'allure-report', 'junit', 'screenshots', 'logs'];

function cleanupDirectory(dirPath: string): void {
    if (!existsSync(dirPath)) {
        logger.warning(`Directory not found: ${dirPath}`);
        return;
    }

    const now = Date.now();
    const retentionMs = RETENTION_DAYS * 24 * 60 * 60 * 1000;
    let filesRemoved = 0;

    const files = readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = join(dirPath, file);
        const stats = statSync(filePath);
        const fileAge = now - stats.mtimeMs;

        if (fileAge > retentionMs) {
            try {
                if (stats.isDirectory()) {
                    rmdirSync(filePath, { recursive: true });
                } else {
                    unlinkSync(filePath);
                }
                filesRemoved++;
                logger.debug(`Removed: ${filePath}`);
            } catch (error) {
                logger.error(`Failed to remove: ${filePath}`, error);
            }
        }
    });

    if (filesRemoved > 0) {
        logger.success(`Cleaned ${filesRemoved} files from ${dirPath}`);
    } else {
        logger.info(`No old files to clean in ${dirPath}`);
    }
}

// Main execution
logger.header('Report Cleanup');
logger.info(`Retention policy: ${RETENTION_DAYS} days\n`);

REPORT_DIRS.forEach((dir) => {
    cleanupDirectory(dir);
});

logger.success('\n✅ Cleanup completed!\n');
