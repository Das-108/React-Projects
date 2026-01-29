pipeline {
    agent any

    environment {
        // This must match the name you gave the tool in 'Manage Jenkins > Tools'
        NODEJS_HOME = tool name: 'node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Cleanup & Checkout') {
            steps {
                echo 'Cleaning workspace and fetching latest code...'
                deleteDir()
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Change 'Color-Palate-Generator' to whichever folder you want to build
                dir('Color-Palate-Generator') {
                    echo 'Installing npm packages...'
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('Color-Palate-Generator') {
                    echo 'Running tests...'
                    sh 'CI=true npm test'
                }
            }
        }

        stage('Build Project') {
            steps {
                dir('Color-Palate-Generator') {
                    echo 'Creating production build...'
                    sh 'npm run build'
                }
            }
        }

        stage('Archive') {
            steps {
                echo 'Saving build artifacts...'
                archiveArtifacts artifacts: 'Color-Palate-Generator/build/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Success! Your React app has been built.'
        }
        failure {
            echo 'Build Failed. Ensure the folder name in the Jenkinsfile matches the folder in VS Code.'
        }
    }
}