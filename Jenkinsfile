pipeline {
    agent any

    environment {
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
        failure {
            echo "Pipeline failed. Check the Docker logs or Jenkins console output."
        }
    }
}