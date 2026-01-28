/**
 * CI/CD Platform Detector
 * Detects which CI/CD platform is running the tests
 */

export type CIPlatform = 'gitlab' | 'github' | 'jenkins' | 'circleci' | 'azure' | 'bitbucket' | 'local';

export interface CIInfo {
    platform: CIPlatform;
    buildNumber?: string;
    buildUrl?: string;
    branch?: string;
    commit?: string;
}

export function detectCI(): CIInfo {
    // GitLab CI
    if (process.env.GITLAB_CI) {
        return {
            platform: 'gitlab',
            buildNumber: process.env.CI_PIPELINE_ID,
            buildUrl: process.env.CI_PIPELINE_URL,
            branch: process.env.CI_COMMIT_REF_NAME,
            commit: process.env.CI_COMMIT_SHA,
        };
    }

    // GitHub Actions
    if (process.env.GITHUB_ACTIONS) {
        return {
            platform: 'github',
            buildNumber: process.env.GITHUB_RUN_NUMBER,
            buildUrl: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
            branch: process.env.GITHUB_REF_NAME,
            commit: process.env.GITHUB_SHA,
        };
    }

    // Jenkins
    if (process.env.JENKINS_HOME) {
        return {
            platform: 'jenkins',
            buildNumber: process.env.BUILD_NUMBER,
            buildUrl: process.env.BUILD_URL,
            branch: process.env.GIT_BRANCH,
            commit: process.env.GIT_COMMIT,
        };
    }

    // CircleCI
    if (process.env.CIRCLECI) {
        return {
            platform: 'circleci',
            buildNumber: process.env.CIRCLE_BUILD_NUM,
            buildUrl: process.env.CIRCLE_BUILD_URL,
            branch: process.env.CIRCLE_BRANCH,
            commit: process.env.CIRCLE_SHA1,
        };
    }

    // Azure Pipelines
    if (process.env.TF_BUILD) {
        return {
            platform: 'azure',
            buildNumber: process.env.BUILD_BUILDNUMBER,
            buildUrl: `${process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI}${process.env.SYSTEM_TEAMPROJECT}/_build/results?buildId=${process.env.BUILD_BUILDID}`,
            branch: process.env.BUILD_SOURCEBRANCHNAME,
            commit: process.env.BUILD_SOURCEVERSION,
        };
    }

    // Bitbucket Pipelines
    if (process.env.BITBUCKET_BUILD_NUMBER) {
        return {
            platform: 'bitbucket',
            buildNumber: process.env.BITBUCKET_BUILD_NUMBER,
            buildUrl: `https://bitbucket.org/${process.env.BITBUCKET_REPO_FULL_NAME}/addon/pipelines/home#!/results/${process.env.BITBUCKET_BUILD_NUMBER}`,
            branch: process.env.BITBUCKET_BRANCH,
            commit: process.env.BITBUCKET_COMMIT,
        };
    }

    // Local
    return {
        platform: 'local',
    };
}

export function isCI(): boolean {
    return detectCI().platform !== 'local';
}
