pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'node', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Cleanup & Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('Color-Palate-Generator') {
                    echo 'Installing npm packages...'
                    sh 'npm install'
                }
            }
        }

        stage('Build Project') {
            steps {
                dir('Color-Palate-Generator') {
                    echo 'Creating production build with Vite...'
                    sh 'npm run build'
                }
            }
        }

        stage('Archive') {
            steps {
                echo 'Saving build artifacts...'
                // Corrected path for Vite projects
                archiveArtifacts artifacts: 'Color-Palate-Generator/dist/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'SUCCESS! You can find your built files in the Artifacts section.'
        }
    }
}