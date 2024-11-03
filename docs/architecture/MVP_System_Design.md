# System Design Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Constraints and Limitations](#constraints-and-limitations)
4. [System Architecture](#system-architecture)
5. [Technology Stack](#technology-stack)
6. [Data Design](#data-design)
7. [API Design](#api-design)
8. [Caching and Performance Optimization](#caching-and-performance-optimization)
9. [Error Handling and Logging](#error-handling-and-logging)
10. [Security Considerations](#security-considerations)
11. [Testing Strategy](#testing-strategy)
12. [Deployment and DevOps](#deployment-and-devops)
13. [Scalability and Performance](#scalability-and-performance)
14. [Maintenance and Support](#maintenance-and-support)
15. [Future Enhancements and Roadmap](#future-enhancements-and-roadmap)

## Introduction
### Overview
Linkta is an innovative e-learning platform that aims to address the challenges learners face in comprehending complex topics and grasping the interconnections within vast bodies of knowledge. In an era of information overload, Linkta empowers users by providing a visual interface to create personalized knowledge graphs (aka Linkta Flows) that establish hierarchies to uncover the hidden relationships between concepts.

### Purpose
The core functionality of Linkta revolves around transforming intricate subjects into interactive visual representations through the integration of natural language processing and intuitive user interactions. By leveraging these technologies, Linkta enables learners to navigate complex domains efficiently, filter out extraneous content, and focus on the most salient concepts and their relationships, facilitating a deeper understanding of the subject matter.

### Scope
This document outlines the system design for the Minimum Viable Product (MVP) of Linkta, detailing the architectural decisions, technical implementations, and design considerations required to bring this innovative learning solution to fruition.

### Objectives
By introducing visual metaphors and personalized knowledge graphs, Linkta aims to revolutionize the way individuals acquire, organize, and retain knowledge, empowering them to unlock their full learning potential and achieve a deeper comprehension of complex topics.

## Requirements
### Functional Requirements:
- **User Authentication and Authorization**
    - Implement support for email/password, OAuth and other single sign-on methods
    - Develop a "forgot password" functionality
    - Implement auth-guard for API endpoints
- **UserInput Submission and Processing**
    - Provide a mechanism for users to submit UserInput
    - Provide a mechanism to pre-process (sanitize, add context, reformat) UserInput
    - Provide a mechanism to interact with LLM to process UserInput and generate a LinktaFLow
    - Provide a mechanism to ensure the LinktaFLow generated by the LLM adheres to the desired format
    - Store UserInput and LinktaFLow in the database & return the LinktaFLow to the user
- **LinktaFlow Visualization and Interaction**
    - Provide a mechanism for users to visualize a LinktaFlow
    - Provide a mechanism for users to delete a LinktaFlow
    - Provide a mechanism for users to regenerate a new LinktaFlow
    - Provide a mechanism for users to update and version their LinktaFlow (e.g., save button or other appropriate mechanisms)
    - Node Interaction within a LinktaFlow:
        - Implement CRUD (Create, Read, Update, Delete) functionality for nodes
        - Develop basic drag-and-drop functionality for node movement
        - Implement visual feedback, such as node highlighting, on hover or selection
    - Provide undo/redo functionality to allow users to revert or re-apply changes made to LinktaFlows
- **User Management and Settings**
    - Provide a mechanism to retrieve and display LinktaFlows associated with a specific user
    - Provide a user settings mechanism that allows users to update their profile information and reset their password
    - Consider incorporating versioning for LinktaFlows within the user model to track and manage different versions of user-generated content (TBD)
- **Bug Reporting**
    - Implement a bug reporting mechanism that automatically creates bug tickets in the Linkta core repository

### Non-Functional Requirements:
- **Performance:** Fast response Efforts for API endpoints and optimized tree retrieval and rendering to reduce bounce rates.
- **Scalability:** Capable of handling an increasing number of users and data without performance degradation.
- **Security:** Robust authentication mechanisms, compliance with data privacy laws (GDPR, CCPA), and rate limiting to prevent abuse.
- **Reliability:** High system availability with minimal downEffort and robust error recovery mechanisms.
- **Maintainability:** Well-documented codebase adhering to coding standards, with a modular architecture for ease of updates.
- **Usability:** Intuitive user interface with straightforward onboarding processes.
- **Accessibility:** Compliance with WCAG guidelines.
- **Compatibility:** Functionality across various browsers and devices, particularly mobile.
- **Data Management:** Ensures data consistency and integrity, particularly for user-generated content.
- **Legal and Ethical Compliance:** Adherence to legal and ethical standards applicable to the software and its use.

## Constraints and Limitations
### Technical Constraints:
- **Tech Stack Integration:** Selected technologies must integrate seamlessly for low latency, high scalability, and robust security.
- **Cross-Platform Compatibility:** The system should be designed to support both web and potential future mobile applications, ensuring a consistent user experience across platforms.
### Resource Constraints:
- **Development Efficiency:** The development process must be efficient, leveraging the team's existing expertise with the MERN (MongoDB, Express, React, Node.js) stack within the constraints of a limited budget and Effortline.
- **Budget Limitations:** Due to financial constraints, strategic feature prioritization and efficient resource allocation are necessary to deliver a high-quality product within the allocated budget.
### Market Constraints:
- **Competitive Advantage:** To stand out in a competitive market, the Linkta system should offer unique features or superior performance compared to existing solutions.
- **Future Enhancements:** The system should be designed to accommodate future enhancements, including the integration of Retrieval-Augmented Generation (RAG) post-MVP, to enhance data processing and user interaction capabilities.

## System Architecture
Linkta employs a client-server architecture in a mono repo, facilitating interaction between the user-facing frontend and the server-side backend through a RESTful API.

The frontend is developed using React, incorporating various libraries to enhance interactivity and user experience. The backend is built on Node.js and Express, with Redis for caching and MongoDB for data persistence.

User authentication and authorization are managed through Firebase Authentication. The entire system is hosted on Google Cloud Platform (GCP) with Firebase Hosting.

### Architecture Diagram
![MVP System Design Diagram](../assets/mvp-system-design-diagram.png "MVP system design diagram")

## Technology Stack
- **Programming Language:** TypeScript
- **Frontend:** React, Zustand, React Query (Tanstack Query), React Router, React Flow,  Material UI, React Hook Form, Axios, zundo
- **Backend:** Node.js, Express, Redis, MongoDB (with Mongoose ORM), express-rate-limit
- **LLM Provider**: Gemini
- **Auth Provider:** Firebase Authentication
- **DevOps/Infrastructure:** GCP, Firebase Hosting, GitHub Actions, Git, Vite, Husky, Eslint, Prettier
- **Testing:** Vitest, React Testing Library, Cypress
- **Others:** Zod, log4js, Turbo Console Log

## Data Design
The detailed field-level information for each entity can be found in the "Data Design" section of the [API Design documentation](./API_Design_V1.md).

## API Design
The detailed API endpoints, request/response formats, and authentication requirements can be found in the [API Design documentation](./API_Design_V1.md).

## Caching and Performance Optimization
>_Work in progress_

## Error Handling and Logging

### Error Handling Strategy
- **Custom Error Hierarchy:** Implement a `CustomError` base class extended by specific error types (e.g., `ValidationError`, `UnauthorizedError`, `InternalServerError`).
- **Standardized Error Properties:** Each custom error includes:
   - `status`: HTTP status code
   - `message`: User-friendly error description
   - `log`: Detailed error information for server-side logging
- **Global Error Handler:** Centralized middleware (`globalErrorHandler`) to process all errors uniformly.

### Logging Implementation
- Utilize `log4js` for structured logging.
- Configure logger instances for different modules (e.g., `[ErrorHandler]`).
- Log detailed error information, including custom properties.

### Error Types
Implement specific error classes for common scenarios:
- `ValidationError` (400)
- `UnauthorizedError` (401)
- `ForbiddenError` (403)
- `LinktaFlowNotFoundError` (404)
- `TooManyRequestsError` (429)
- `InternalServerError` (500)
- `ServiceUnavailableError` (503)

## Security Considerations
- **Authentication and Authorization:** Firebase Authentication is used for user authentication and authorization. API endpoints are protected and require valid session tokens for access.
- **Data Privacy:** The system will be designed to comply with relevant data privacy laws such as GDPR and CCPA.
- **Rate Limiting:** Rate limiting mechanisms will be implemented to prevent abuse and protect against excessive requests.
- **Secure Communication:** HTTPS will be used for all client-server communications to ensure data confidentiality and integrity.

## Testing Strategy
- **Unit Testing:** Individual components and modules will be tested using Vitest, React Testing Library to ensure they function as expected in isolation.
- **Integration Testing:** Integration tests will be performed to verify the proper functioning of component interactions and workflows.
- **End-to-End Testing:** Cypress will be used for end-to-end testing to simulate user interactions and validate the system's behavior from the user's perspective.
- **Performance and Load Testing:** Performance and load testing will be conducted to identify performance bottlenecks, optimize code, and ensure the application can handle expected user traffic.
- **Accessibility Testing:** Accessibility testing will be performed to ensure the application adheres to WCAG accessibility guidelines, including testing for keyboard navigation, color contrast, and screen reader compatibility.
- **Security Testing:** Security testing, including penetration testing and vulnerability scanning, will be conducted to identify and mitigate security risks. Security best practices, such as input validation, rate limiting, and secure headers, will be implemented.

## Deployment and DevOps
- **Deployment:** Linkta will be deployed on Google Cloud Platform (GCP) using Firebase Hosting.
- **Continuous Integration and Continuous Deployment (CI/CD):** GitHub Actions will be utilized to automate the build, testing, and deployment processes.

## Scalability and Performance
>_Work in progress_

## Maintenance and Support
>_Work in progress_

## Future Enhancements and Roadmap
>_Work in progress_