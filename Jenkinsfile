pipeline {
    agent any

    environment {
        // Fix for 'docker: command not found' on macOS
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin/docker"
        IMAGE_NAME = "Gallery-Project"
        CONTAINER_NAME = "Gallery-Project-container"
        HOST_PORT = "8081" 
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
                echo "Building image from root context..."
                // Running from root so Docker can see the 'Color-Palate-Generator' folder
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Docker Deploy') {
            steps {
                script {
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