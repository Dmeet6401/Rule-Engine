# Rule Engine with Abstract Syntax Tree (AST)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Design Choices](#design-choices)
- [Prerequisites](#prerequisites)
- [Deployment](#deployment)
- [Application Link](#application-link)
- [Future Improvements](#future-improvements)

---

## Introduction
The **Rule Engine** is a dynamic application that allows users to create, combine, and evaluate rules based on user attributes such as `age`, `department`, and `income`. These rules are represented as an Abstract Syntax Tree (AST), allowing complex and flexible rule combinations. The app also supports combining existing rules using `AND/OR` operators and saving them as new rules.

---

## Features
- Create individual rules.
- Combine existing rules with `AND/OR` operators.
- Dynamically evaluate rules based on input data.
- RESTful APIs for creating, combining, and evaluating rules.
- Intuitive UI for rule management and combination.

---

## Tech Stack
- **Backend**: Node.js with Express.js
- **Frontend**: React.js
- **Database**: MongoDB
- **Containerization**: Docker or Podman for containerized backend and frontend
- **Deployment**: Vercel (Frontend) and Back4App (Backend)

---

## Design Choices
1. **Abstract Syntax Tree (AST)**: The rules are represented using an AST, enabling the efficient evaluation and combination of conditions (such as `age > 30` or `department == 'Sales'`). This design helps represent both simple and complex rules.
   
2. **Separation of Concerns**: The project is split into two main parts:
   - **Backend**: Handles API requests, rule evaluation, and database management.
   - **Frontend**: Provides a user-friendly interface to create and manage rules.
   
3. **Containerization**: Both the backend and frontend are containerized using Docker/Podman, ensuring easy setup and deployment on various platforms.

4. **CombineRule Component**: Allows users to select existing rules and join them with operators like `AND`/`OR`, then submit the newly combined rule for storage.


---

## Prerequisites

### System Requirements
- **Operating System**: Linux, macOS, or Windows
- **Node.js**: v14 or later
- **MongoDB**: Locally or remotely hosted (e.g., MongoDB Atlas)
- **Docker or Podman**: For containerization

### Software Dependencies

- **Node.js**:
  - Install from [Node.js official website](https://nodejs.org/)
  
- **MongoDB**:
  - Install MongoDB locally from [MongoDB Community](https://www.mongodb.com/try/download/community)
  - Alternatively, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud-hosted MongoDB.

  **MongoDB Docker**:
  - Run MongoDB as a container:
    ```bash
    docker run --name mongodb -p 27017:27017 -d mongo
    ```
  
- **Docker**:
  - **Docker**: Install from [Docker](https://docs.docker.com/get-docker/).
  

---

## CombineRule Component

The **CombineRule** component provides a user interface to allow users to:

- **Select Existing Rules**: Users can select multiple rules from a dropdown list populated with previously created rules.
- **Choose Logical Operators**: After selecting the rules, users can combine them using either `AND` or `OR`, which is chosen via a dropdown menu.
- **Create a New Combined Rule**: Once the rules and operator are selected, the user can submit the form to create a new combined rule. This new rule is sent to the backend and stored in the database for future evaluations.

### How It Works:
1. **Fetching Existing Rules**: The component fetches the list of existing rules from the backend using an API call when the page is loaded.
2. **Combining Rules**: Users can select the rules to combine and the logical operator (`AND` or `OR`) via a dropdown. The selected rules are combined into a single rule.
3. **Submitting the Combined Rule**: Once the user submits the new combined rule, it is stored in the backend for future use.

This component provides flexibility to create more complex rules based on existing simple rules, making the rule engine highly customizable and scalable.



## Deployment

### Deployment Steps

1. **Back4App (Backend)**:  
   For containerizing the backend, Back4App is used. Here are the steps:
   - **Build the Backend Container**:
     - Navigate to the backend directory and build the Docker image:
       ```bash
       docker build -t ruleengine-backend .
       ```
   - **Push the Container**:  
     Push the backend container to a container registry (e.g., Docker Hub or Back4App):
     ```bash
     docker tag ruleengine-backend <your-back4app-repo-url>:latest
     docker push <your-back4app-repo-url>:latest
     ```
   - **Deploy on Back4App**:  
     Log in to your Back4App account, configure the repository, and deploy the containerized backend.

2. **Vercel (Frontend)**:  
   The frontend is deployed using Vercel. The following steps ensure continuous integration and deployment:
   - **Connect Repository**:  
     Connect your GitHub repository (or other version control system) to Vercel.
   - **Automatic Deployment**:  
     Once connected, Vercel will automatically build and deploy the frontend every time there is a push to the main branch. If you make updates or changes to the frontend, simply push to the repository and Vercel will handle the rest.

## Application Link

You can access the deployed application at the following link:

**Rule Engine Web App**: [https://rule-engine-ayk4psxkp-meet-desais-projects-0f3ca4a1.vercel.app/](https://rule-engine-ayk4psxkp-meet-desais-projects-0f3ca4a1.vercel.app/)

---

## Future Improvements

1. **User Authentication**: Add user authentication to enable rule ownership, rule sharing, and access control.
2. **Advanced Rule Customization**: Allow users to define custom functions or logic for advanced rule customization.
3. **Graphical Rule Builder**: Create a drag-and-drop graphical interface to help users visually create and modify rules.
4. **Error Handling & Validation**: Enhance error handling for invalid rule formats and improve input validation, ensuring that the rules are syntactically and logically correct.

