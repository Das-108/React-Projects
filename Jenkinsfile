pipeline {
    agent any

    environment {
        // Docker requires image names to be lowercase
        IMAGE_NAME = "gallery-project"
        CONTAINER_NAME = "gallery-project-container"
        HOST_PORT = "8081" 
        // Ensuring Docker is in the PATH for your environment
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
                echo "Building image: ${IMAGE_NAME} from root context..."
                // Build command using the lowercase variable
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Docker Deploy') {
            steps {
                script {
                    echo "Stopping and removing existing containers..."
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    
                    echo "Starting new container on port ${HOST_PORT}..."
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