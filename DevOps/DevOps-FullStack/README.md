# Project Name

## Overview
This project provides a flexible deployment approach, allowing you to deploy the application in multiple ways based on your infrastructure requirements. The following four deployment methods are supported:

1. **Local Deployment** – Run the application without any tools.
2. **Docker Compose on AWS** – Deploy using Docker Compose on an AWS EC2 instance.
3. **Jenkins Pipeline on AWS** – Automate deployment with a Jenkins pipeline on AWS.
4. **EKS Cluster with Terraform** – Deploy a production-ready setup using Terraform on an AWS EKS cluster.

---

## Deployment Methods

### 1. Local Deployment (Without Any Tools)
This method runs the application locally without additional dependencies.

#### Steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/project.git
   cd project
   ```
2. Install required dependencies (if applicable).
3. Run the application manually:
   ```sh
   <command_to_run_application>
   ```

---

### 2. Deployment via Docker Compose on AWS
This method uses **Docker Compose** to deploy the application on an AWS EC2 instance.

#### Steps:
1. Launch an EC2 instance and SSH into it.
2. Install Docker and Docker Compose.
3. Clone the repository and navigate to the project directory:
   ```sh
   git clone https://github.com/your-repo/project.git
   cd project
   ```
4. Run the following command to start the application:
   ```sh
   docker-compose up -d
   ```
5. Access the application via `http://<EC2-IP>:<PORT>`.

---

### 3. Deployment via Jenkins Pipeline on AWS
This method automates deployment using Jenkins.

#### Steps:
1. Set up a Jenkins server on an AWS EC2 instance and install the Jenkins plugins.
- Create `plugins.txt` with the required plugins (e.g., Docker, Maven, etc.).

```bash
# Setting Up Environment Variables
export JEN_URL=http://localhost:8080/
export JEN_USER=admin
export JEN_PASS=ibtisam

# Download the CLI Tool
wget $JEN_URL/jnlpJars/jenkins-cli.jar

# Run the Jenkins CLI
java -jar jenkins-cli.jar -s $JEN_URL/jnlpJars/jenkins-cli.jar

# Install all plugins from the file
while read plugin; do
    java -jar jenkins-cli.jar -s $JEN_URL -auth $JEN_USER:$JEN_PASS install-plugin $plugin
done < plugins.txt
systemctl restart jenkins
```
2. Configure necessary credentials in Jenkins.
- Sonar & Webhook token with **secret text**
- Github, Docker Hub and Nexus credentials with **Username with password**
3. Configure tools: SonarQube, Maven, JDK and NodeJS etc.
4. Configure global settings and paths: SonarQube server, Global Trusted Pipeline Libraries, etc.
5. Config File Management: Global Maven settings.xml, .npmrc etc.
6. Configure Webhook Trigger for Jenkinsfile.
7. Set up a webhook in SonarQube Server to send analysis results to Jenkins.
8. Use the provided **Jenkinsfile** for pipeline automation.
9. Trigger a build to deploy the application.

---

### 4. Deployment via EKS Cluster with Terraform
This method provisions an AWS EKS cluster using **Terraform** and deploys the application in a Kubernetes environment.

#### Steps:
1. Ensure you have AWS CLI, kubectl, Terraform, and Helm installed.
2. Navigate to the Terraform directory:
   ```sh
   cd terraform
   ```
3. Initialize and apply Terraform scripts:
   ```sh
   terraform init
   terraform apply -auto-approve
   ```
4. Configure `kubectl` to use the created EKS cluster.
5. Deploy the application to Kubernetes:
   ```sh
   kubectl apply -f k8s-manifests/
   ```
6. Verify the deployment:
   ```sh
   kubectl get pods
   ```

---

## Conclusion
This project supports multiple deployment approaches, making it suitable for various environments. Choose the method that best fits your needs.

For any issues, please open an [issue](https://github.com/your-repo/project/issues) in this repository.

---

## License
[MIT License](LICENSE)


