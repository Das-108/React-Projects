pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Docker Compose Deploy') {
            steps {
                echo "Building and starting services..."
                // --build: Forces a rebuild of the image using your Dockerfile
                // -d: Runs in the background (detached mode)
                sh "docker-compose up --build -d"
            }
        }
    }

    post {
        success {
            echo "Application is live!"
        }
        always {
            // Clean up dangling images to save space on your Jenkins node
            sh "docker image prune -f"
        }
    }
}