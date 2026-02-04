pipeline {
    agent any

    environment {
        // Name for your Docker Image and Container
        IMAGE_NAME = "color-palate-app"
        CONTAINER_NAME = "color-palate-container"
        // The port you want to use to access the app on your browser
        HOST_PORT = "8081" 
    }

    stages {
        stage('Checkout') {
            steps {
                // Wipe workspace and pull latest code from Git
                deleteDir()
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building the Docker image..."
                // Build the image using the Dockerfile in the root directory
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Docker Deploy') {
            steps {
                script {
                    echo "Stopping old containers and starting the new one..."
                    
                    // Stop and remove the container if it's already running
                    // '|| true' ensures the pipeline doesn't crash if the container doesn't exist yet
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"

                    // Start the new container
                    // Maps Host Port (8081) to Container Port (80)
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:80 ${IMAGE_NAME}"
                }
            }
        }
    }

    post {
        success {
            echo "---------------------------------------------------------"
            echo "SUCCESS: Your changes are now live!"
            echo "Access your app at http://localhost:${HOST_PORT}"
            echo "---------------------------------------------------------"
        }
        failure {
            echo "Build or Deployment failed. Please check the logs above."
        }
    }
}