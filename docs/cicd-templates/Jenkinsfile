pipeline {
  agent any
  
  tools {
    nodejs 'NodeJS 18'
  }
  
  // Uncomment to run tests automatically
  // triggers {
  //   cron('H 2 * * *')  // Run daily at 2 AM
  // }
  
  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '30'))
    timeout(time: 2, unit: 'HOURS')
  }
  
  environment {
    CI = 'true'
    EXECUTION_MODE = "${params.EXECUTION_MODE ?: 'local'}"
    TEST_ENV = "${params.TEST_ENV ?: 'dev'}"
    PATH = "/usr/local/bin:/opt/homebrew/bin:$PATH"
    JAVA_HOME = "/opt/homebrew/opt/openjdk@17"
    TZ = 'Asia/Ho_Chi_Minh'
  }
  
  parameters {
    choice(
      name: 'EXECUTION_MODE',
      choices: ['local', 'fast', 'cloud', 'mobile'],
      description: 'Execution mode for tests'
    )
    choice(
      name: 'TEST_ENV',
      choices: ['dev', 'staging', 'prod'],
      description: 'Test environment'
    )
  }
  
  stages {
    // ==========================================
    // Stage 1: Checkout
    // ==========================================
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    
    // ==========================================
    // Stage 2: Setup
    // ==========================================
    stage('Setup') {
      steps {
        echo "Setting up environment..."
        echo "Execution Mode: ${EXECUTION_MODE}"
        echo "Test Environment: ${TEST_ENV}"
        
        sh 'node --version'
        sh 'npm --version'
        
        sh 'npm install'
      }
    }
    
    // ==========================================
    // Stage 3: Run Tests
    // ==========================================
    stage('Run Tests') {
      options {
        timeout(time: 1, unit: 'HOURS')
      }
      steps {
        echo "Running WDIO tests..."
        
        // Clean previous results
        sh '''
          rm -rf allure-results
          rm -rf allure-report
          mkdir -p allure-results
        '''
        
        script {
          def testCommand = "npm run test:${EXECUTION_MODE}"
          sh testCommand
        }
      }
      
      post {
        always {
          // Archive test results
          archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true
          archiveArtifacts artifacts: 'screenshots/**/*', allowEmptyArchive: true
          archiveArtifacts artifacts: 'logs/**/*', allowEmptyArchive: true
          
          // Publish JUnit results (prevent UNSTABLE status)
          junit allowEmptyResults: true,
                healthScaleFactor: 0.0,
                testResults: 'junit/results.xml'
        }
      }
    }
    
    // ==========================================
    // Stage 4: Generate Allure Report
    // ==========================================
    stage('Generate Allure Report') {
      steps {
        echo "Generating Allure report..."
        sh 'npm run allure:generate'
        
        // Publish Allure report
        allure([
          includeProperties: false,
          jdk: '',
          properties: [],
          reportBuildPolicy: 'ALWAYS',
          results: [[path: 'allure-results']]
        ])
      }
      
      post {
        always {
          // Archive HTML report
          publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'allure-report',
            reportFiles: 'index.html',
            reportName: 'Allure Report',
            reportTitles: 'WDIO Test Report'
          ])
        }
      }
    }
  }
  
  post {
    always {
      script {
        // Send unified email notification
        emailext (
          subject: "📊 WDIO Test Report: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
          body: """
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
                .content { padding: 30px; max-width: 800px; margin: 0 auto; }
                table { border-collapse: collapse; width: 100%; margin: 15px 0; }
                th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                th { background-color: #f5f5f5; font-weight: bold; }
                .test-passed { color: #4CAF50; font-weight: bold; }
                .test-failed { color: #f44336; font-weight: bold; }
                .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
                a { color: #2196F3; text-decoration: none; }
                a:hover { text-decoration: underline; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>📊 WDIO Test Report</h1>
              </div>
              
              <div class="content">
                <h2>Build Information</h2>
                <table>
                  <tr><th>Property</th><th>Value</th></tr>
                  <tr><td>Project</td><td>${env.JOB_NAME}</td></tr>
                  <tr><td>Build Number</td><td>#${env.BUILD_NUMBER}</td></tr>
                  <tr><td>Execution Mode</td><td>${EXECUTION_MODE}</td></tr>
                  <tr><td>Environment</td><td>${TEST_ENV}</td></tr>
                  <tr><td>Build Time</td><td>${new Date(currentBuild.startTimeInMillis).format('yyyy-MM-dd HH:mm:ss', TimeZone.getTimeZone('Asia/Ho_Chi_Minh'))}</td></tr>
                  <tr><td>Duration</td><td>${currentBuild.durationString.replace(' and counting', '')}</td></tr>
                </table>
                
                <h2>Test Results</h2>
                <table>
                  <tr><th>Metric</th><th>Count</th></tr>
                  <tr><td>Total Tests</td><td><strong>\${TEST_COUNTS,var="total"}</strong></td></tr>
                  <tr><td>Passed</td><td class="test-passed">\${TEST_COUNTS,var="pass"}</td></tr>
                  <tr><td>Failed</td><td class="test-failed">\${TEST_COUNTS,var="fail"}</td></tr>
                  <tr><td>Skipped</td><td>\${TEST_COUNTS,var="skip"}</td></tr>
                </table>
                
                <h2>📊 View Detailed Reports</h2>
                <ul>
                  <li><a href="${env.BUILD_URL}allure">Allure Report</a> - Interactive test report with charts and screenshots</li>
                  <li><a href="${env.BUILD_URL}Allure_20Report">HTML Report</a> - Static HTML report</li>
                  <li><a href="${env.BUILD_URL}console">Console Output</a> - Full build log</li>
                </ul>
                
                <div class="footer">
                  <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                  <p>This is an automated notification from Jenkins CI/CD</p>
                  <p><em>WDIO Test Automation Framework</em></p>
                </div>
              </div>
            </body>
            </html>
          """,
          to: 'khanhvuduy7101@gmail.com',
          from: 'jenkins@enouvo.com',
          replyTo: 'jenkins@enouvo.com',
          mimeType: 'text/html'
        )
      }
      
      echo "Pipeline completed!"
      
      // Clean workspace
      cleanWs(
        deleteDirs: true,
        patterns: [
          [pattern: 'node_modules', type: 'INCLUDE'],
          [pattern: 'allure-results', type: 'INCLUDE']
        ]
      )
    }
    
    success {
      echo "✅ Pipeline succeeded!"
    }
    
    failure {
      echo "❌ Pipeline failed!"
    }
  }
}
