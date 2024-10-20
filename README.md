Here is the markdown with the requested **API Documentation** section added after **Prerequisites**:

```markdown
# Rule Engine with Abstract Syntax Tree (AST)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Design Choices](#design-choices)
- [Prerequisites](#prerequisites)
- [API Documentation](#api-documentation)
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

## API Documentation
This section provides details about the APIs used in the Rule Engine project, explaining their purpose, request/response format, and error handling mechanisms.

### 1. Create Rule API
**Purpose**: This API allows users to create a new rule and its corresponding AST (Abstract Syntax Tree) representation in the database.

**Method**: POST  
**URL**: `/api/rules/create_rule`

**Request Format**:
```json
{
  "ruleString": "(age > 30 AND department == 'Sales')",
  "ast": {
    "type": "operator",
    "value": "AND",
    "left": { "type": "operand", "value": "age > 30" },
    "right": { "type": "operand", "value": "department == 'Sales'" }
  }
}
```

**Response Format (Success)**:
```json
{
  "success": true,
  "message": "Rule created successfully",
  "rule": {
    "_id": "60f5f9b3b3f0d1234567890",
    "ruleString": "(age > 30 AND department == 'Sales')",
    "ast": { /* AST Representation */ }
  }
}
```

**Error Handling**:
- **400 Bad Request**: If required fields like `ruleString` or `ast` are missing.
  ```json
  {
    "success": false,
    "error": "Missing ruleString or AST"
  }
  ```
- **500 Internal Server Error**: If there is an error while saving the rule.
  ```json
  {
    "success": false,
    "error": "Error saving the rule"
  }
  ```

### 2. Evaluate Rule API
**Purpose**: This API evaluates a rule against the provided user data and checks if the rule conditions match the data.

**Method**: POST  
**URL**: `/api/rules/evaluate_rule`

**Request Format**:
```json
{
  "ruleId": "60f5f9b3b3f0d1234567890",
  "data": {
    "age": 35,
    "department": "Sales"
  }
}
```

**Response Format (Success)**:
```json
{
  "success": true,
  "message": "Rule evaluated successfully",
  "result": true
}
```

**Error Handling**:
- **404 Not Found**: If the rule with the provided `ruleId` does not exist.
  ```json
  {
    "success": false,
    "error": "Rule not found"
  }
  ```
- **400 Bad Request**: If `ruleId` or `data` fields are missing.
  ```json
  {
    "success": false,
    "error": "Missing ruleId or data"
  }
  ```
- **500 Internal Server Error**: If there is an error during evaluation.
  ```json
  {
    "success": false,
    "error": "Error evaluating the rule"
  }
  ```

### 3. Combine Rules API
**Purpose**: This API allows users to combine multiple existing rules into a new rule using `AND` or `OR` operators.

**Method**: POST  
**URL**: `/api/rules/combine_rules`

**Request Format**:
```json
{
  "rules": [
    { "ruleId": "60f5f9b3b3f0d1234567890" },
    { "ruleId": "60f5f9b3b3f0d987654321" }
  ],
  "operator": "AND"
}
```

**Response Format (Success)**:
```json
{
  "success": true,
  "message": "Rules combined successfully",
  "combinedRule": {
    "_id": "60f5f9b3b3f0d1234567899",
    "ruleString": "(rule1String AND rule2String)",
    "ast": { /* Combined AST Representation */ }
  }
}
```

**Error Handling**:
- **404 Not Found**: If any provided `ruleId` does not exist.
  ```json
  {
    "success": false,
    "error": "One or more rules not found"
  }
  ```
- **400 Bad Request**: If `rules` or `operator` are missing.
  ```json
  {
    "success": false,
    "error": "Missing rules or operator"
  }
  ```
- **500 Internal Server Error**: If there is an error during combination.
  ```json
  {
    "success": false,
    "error": "Error combining the rules"
  }
  ```

### 4. Set Threshold API
**Purpose**: This API allows users to set a threshold for alerting based on a specific value and email for notifications.

**Method**: POST  
**URL**: `/api/threshold/set`

**Request Format**:
```json
{
  "threshold": 25,
  "email": "user@example.com"
}
```

**Response Format (Success)**:
```json
{
  "success": true,
  "message": "Threshold set successfully"
}
```

**Error Handling**:
- **400 Bad Request**: If `threshold` or `email` are missing or invalid.
  ```json
  {
    "success": false,
    "error": "Invalid threshold or email"
  }
  ```
- **500 Internal Server Error**: If there is an error setting the threshold.
  ```json
  {
    "success": false,
    "error": "Error setting the threshold"
  }
  ```

**Error Handling Summary**:
- **400 Bad Request**: Returned when there is an issue with the request (e.g., missing fields, invalid data).
- **404 Not Found**: Returned when a requested resource is not found.
- **500 Internal Server Error**: Indicates a server-side issue (e.g., database error).

---

## Deployment

### Deployment Steps

1. **Back4App (Backend)**:  
   For containerizing the backend, Back4App is used. Here are the steps:
   - **Build the Backend Container**:
     - Navigate to the backend directory and build the Docker image:
       ```bash
       docker build -t ruleengine

-backend .
       ```
     - Push the image to Docker Hub or any container registry.
   - **Deploy on Back4App**:
     - Use the Back4App interface to deploy the container from the registry.
     
2. **Vercel (Frontend)**:
   - Navigate to the frontend directory and push the project to a GitHub repository.
   - Connect the GitHub repository to Vercel.
   - Set up the necessary environment variables for API URLs.
   - Vercel will handle the build and deployment.

---

## Application Link
The application is live at: [Rule Engine](https://rule-engine-ayk4psxkp-meet-desais-projects-0f3ca4a1.vercel.app/)

---

## Future Improvements
- Add real-time rule evaluation using WebSockets.
- Implement user authentication and role-based access control.
- Add more complex rule types like nested rules or rules with multiple operators.
- Enhance the frontend with animations and better UI/UX.
```

Let me know if you want any further adjustments!
