pipeline {
    agent any

    environment {
        // Updated to lowercase to satisfy Docker naming conventions
        IMAGE_NAME = "gallery-project" 
        CONTAINER_NAME = "gallery-project-container"
        HOST_PORT = "8081" 
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building image: ${IMAGE_NAME}"
                // The '.' indicates the root context where the Dockerfile lives
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Docker Deploy') {
            steps {
                script {
                    // Stop and remove old containers to avoid naming conflicts
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:80 ${IMAGE_NAME}"
                }
            }
        }
    }

    post {
        success {
            echo "Successfully deployed at http://localhost:${HOST_PORT}"
        }
    }
}