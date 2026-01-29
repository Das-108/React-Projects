pipeline {
    agent any

    environment {
        // Defines the Node.js version tool configured in Jenkins
        NODEJS_HOME = tool name: 'node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Cleanup') {
            steps {
                echo 'Cleaning workspace...'
                deleteDir()
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running unit tests...'
                // CI=true prevents the test runner from entering watch mode
                sh 'CI=true npm test'
            }
        }

        stage('Build') {
            steps {
                echo 'Building production bundle...'
                sh 'npm run build'
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo 'Archiving build folder...'
                // This saves the 'build' folder in Jenkins for deployment
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished execution.'
        }
        success {
            echo 'Build Successful! Your React app is ready for deployment.'
        }
        failure {
            echo 'Build Failed. Please check the logs.'
        }
    }
}