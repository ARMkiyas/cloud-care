# Cloud Care - OPT supporting system

Cloud Care is a secure and OPT supporting system built using Next.js. It offers a web-based interface to streamline healthcare operations, replacing manual processes with automated functionalities. The system ensures data security and follows strict security measures to protect sensitive information.

## Table of Contents
- [Key Features](#key-features)
- [Benefits](#benefits)
- [Deployment Architecture](#deployment-architecture)
- [Collaboration and Running the Project](#collaboration-and-running-the-project)
- [Conclusion](#conclusion)

## Key Features:
- Patient Management: Register and manage patient details, medical history, and profiles securely.
- Employee Management: Track employee attendance and generate reports, maintaining data integrity.
- Ward Management: Efficiently manage ward details, availability, and patient allocation while ensuring privacy.
- Blood Bank Management: Streamline blood requests, inventory tracking, and blood group matching with secure data handling.
- Transport Management: Schedule and track patient transport securely for smooth movement.
- Inventory Management: Automate medical supply management, stock tracking, and reordering while maintaining data consistency.

## Benefits:
- Saves time and resources by eliminating manual data entry and paperwork.
- Provides quick and secure access to patient profiles and medical records.
- Improves efficiency and reduces errors in managing employee details and attendance.
- Enhances ward management and patient allocation processes securely.
- Ensures secure handling of blood requests and inventory tracking.
- Streamlines patient transport scheduling and tracking with data privacy.
- Simplifies inventory management and reordering processes while maintaining security.

## Deployment Architecture
The deployment architecture of Cloud Care leverages Terraform for infrastructure management and an Azure Function App named "azure-com-service-with-queue-trigger" for seamless communication within the system. This architecture ensures scalability, reliability, and security.

### Azure Services Used
- **Azure Front Door**: Provides global load balancing, SSL termination, and Web Application Firewall (WAF) capabilities for secure and optimized access to Cloud Care.
- **Azure Virtual Network**: Establishes a secure network environment for Azure resources, ensuring isolation and controlled access.
- **Azure Container App**: Hosts the Cloud Care application in a scalable and managed container environment, facilitating deployment and management.
- **Azure Database for PostgreSQL**: Stores application data securely with built-in high availability and scalability features.
- **Azure Storage**: Manages and stores unstructured data securely, supporting various application needs.
- **Azure Key Vault**: Safeguards cryptographic keys and secrets used by Cloud Care, ensuring secure access and compliance.
- **Azure Communication Services**: Facilitates communication capabilities within Cloud Care, ensuring reliable messaging and interaction features.
- **Azure Functions** supports serverless compute for executing specific tasks or responding to events.


![Cloud Care Deployment Architecture](insert-your-image-url-here)

Explore the Supporting Terraform configurations at [Cloud Care Terraform Repository](https://github.com/your-username/cloud-care-terraform).

### Azure Function App
The "azure-com-service-with-queue-trigger" Azure Function App manages communication between different components of Cloud Care, ensuring efficient message queuing and processing.

Access the Azure Function App repository at [Azure Function App Repository](https://github.com/your-username/azure-com-service-with-queue-trigger).


## Collaboration and Running the Project

If you're interested in collaborating on the Cloud Care project, here's how you can get started:

1. **Fork the Repository**: Start by forking the Cloud Care repository on GitHub. This will create a copy of the project under your GitHub account.

2. **Clone the Repository**: Clone the forked repository to your local machine using Git. Open a terminal and run the following command:

   ```
   git clone https://github.com/your-username/cloud-care.git
   ```

3. **Install Dependencies**: Navigate to the project directory and install the required dependencies using your preferred package manager. Here are examples using npm, yarn, and pnpm:

   - Using npm:

     ```
     cd cloud-care
     npm install
     ```

   - Using yarn:

     ```
     cd cloud-care
     yarn install
     ```

   - Using pnpm:

     ```
     cd cloud-care
     pnpm install
     ```

4. **Run the Project**: Once the dependencies are installed, you can start the development server to run the project locally. Use the appropriate command for your package manager:

   - Using npm:

     ```
     npm run dev
     ```

   - Using yarn:

     ```
     yarn dev
     ```

   - Using pnpm:

     ```
     pnpm dev
     ```

   This will start the development server, and you can access the Cloud Care application in your browser at `http://localhost:3000` (or a different port if specified).

5. **Make Changes and Contribute**: Now that you have the project running locally, you can make changes and improvements. Once you're ready to contribute, commit your changes to a new branch and push them to your forked repository.

6. **Submit a Pull Request**: Go to your forked repository on GitHub and submit a pull request (PR) to the original Cloud Care repository. Provide a clear description of the changes you've made and why they should be merged.

The project maintainers will review your pull request, provide feedback, and potentially merge your changes into the main project.



## Conclusion

Collaborating on the Cloud Care project is easy with the provided instructions. By forking the repository, making changes, and submitting a pull request, you can contribute to this Hospital Management System built with Next.js.

Feel free to modify and extend the project based on your requirements and share your improvements with the project community.
