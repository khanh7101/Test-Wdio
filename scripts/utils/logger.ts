import chalk from 'chalk';

/**
 * Logger utility with colored output
 * Provides consistent logging across the framework
 */
export const logger = {
    /**
     * Info message (blue)
     */
    info: (message: string, ...args: any[]): void => {
        console.log(chalk.blue('ℹ'), message, ...args);
    },

    /**
     * Success message (green)
     */
    success: (message: string, ...args: any[]): void => {
        console.log(chalk.green('✓'), message, ...args);
    },

    /**
     * Error message (red)
     */
    error: (message: string, ...args: any[]): void => {
        console.log(chalk.red('✗'), message, ...args);
    },

    /**
     * Warning message (yellow)
     */
    warning: (message: string, ...args: any[]): void => {
        console.log(chalk.yellow('⚠'), message, ...args);
    },

    /**
     * Debug message (gray) - only shown when DEBUG=true
     */
    debug: (message: string, ...args: any[]): void => {
        if (process.env.DEBUG === 'true') {
            console.log(chalk.gray('🐛'), message, ...args);
        }
    },

    /**
     * Step message (cyan) - for test steps
     */
    step: (message: string, ...args: any[]): void => {
        console.log(chalk.cyan('→'), message, ...args);
    },

    /**
     * Divider line
     */
    divider: (): void => {
        console.log(chalk.gray('─'.repeat(60)));
    },

    /**
     * Header with box
     */
    header: (message: string): void => {
        const line = '═'.repeat(message.length + 4);
        console.log(chalk.bold.cyan(`\n╔${line}╗`));
        console.log(chalk.bold.cyan(`║  ${message}  ║`));
        console.log(chalk.bold.cyan(`╚${line}╝\n`));
    },
};
