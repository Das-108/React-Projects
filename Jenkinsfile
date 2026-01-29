pipeline {
    agent any

    environment {
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
                // Change 'Tic-Tac-Toe' to your actual project folder name
                dir('Tic-Tac-Toe') { 
                    echo 'Installing npm packages...'
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('Tic-Tac-Toe') {
                    echo 'Running unit tests...'
                    sh 'CI=true npm test'
                }
            }
        }

        stage('Build') {
            steps {
                dir('Tic-Tac-Toe') {
                    echo 'Building production bundle...'
                    sh 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Adjust path to include the folder name
                echo 'Archiving build folder...'
                archiveArtifacts artifacts: 'Tic-Tac-Toe/build/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished execution.'
        }
        success {
            echo 'Build Successful!'
        }
        failure {
            echo 'Build Failed. Check if the folder name in the Jenkinsfile matches your Git repo.'
        }
    }
}