# Admission Microservice

This repository contains a microservice that handles the admission database for a college. It provides functionality to store and retrieve student information using a MongoDB database with the help of Mongoose.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [API Testing](#api-testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Store student information in the admission database.
- Retrieve student information from the database.
- Secure storage of sensitive data such as passwords.
- Timestamps for creation and last update of student documents.
- Enumerations for faculty and Nepal states.

## Prerequisites

Before installing and running this microservice, ensure that you have the following prerequisites:

- Node.js (v12 or higher)
- MongoDB

## Installation

To get started with the admission database microservice, follow these steps:

1. Clone this repository to your local machine.

```shell
git clone https://github.com/rahuldahal/admission.git
```

2. Install the dependencies by navigating to the cloned repository directory and running the following command:

```shell
cd admission
npm install
```

3. Set up the environment variables. Create a `.env` file in the root directory and provide the necessary values for the following variables:

```
MONGODB_URI=<your-mongodb-connection-uri>
```

4. Start the microservice by running the following command:

```shell
npm start
```

The microservice should now be up and running on the specified port (default: 3000) and connected to the MongoDB database.

## Usage

Once the microservice is running, you can interact with it by sending HTTP requests to the provided API endpoints. See the [API Endpoints](#api-endpoints) section for more details.

## API Endpoints

The following API endpoints are available for interacting with the admission database microservice:

### Create a student document

- **Endpoint:** `/students`
- **Method:** POST
- **Request Body:**

```json
{
  "email": "student@example.com",
  "password": "secretpassword",
  "dateOfBirth": "1990-01-01",
  "mobileNo": 1234567890,
  "faculty": "BIM",
  "semester": 3,
  "firstName": "John",
  "lastName": "Doe",
  "address": "123 Street",
  "city": "Kathmandu",
  "state": "Bagmati",
  "postalCode": 44600,
  "guardianName": "Jane Doe",
  "guardianContact": 9876543210
}
```

- **Response:**

```json
{
  "_id": "6072f01234567890abcdef12",
  "email": "student@example.com",
  "dateOfBirth": "1990-01-01",
  "mobileNo": 1234567890,
  "faculty": "BIM",
  "semester": 3,
  "firstName": "John",
  "lastName": "Doe",
  "address": "123 Street",
  "city": "Kathmandu",
  "state": "Bagmati",
  "postalCode": 44600,
  "guardianName": "Jane Doe",
  "guardianContact": 9876543210,
  "createdAt": "2021-04-11T12:34:56.789Z",
  "updatedAt": "

2021-04-11T12:34:56.789Z"
}
```

### Get all students

- **Endpoint:** `/students`
- **Method:** GET
- **Response:**

```json
[
  {
    "_id": "6072f01234567890abcdef12",
    "email": "student1@example.com",
    "dateOfBirth": "1990-01-01",
    "mobileNo": 1234567890,
    "faculty": "BIM",
    "semester": 3,
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Street",
    "city": "Kathmandu",
    "state": "Bagmati",
    "postalCode": 44600,
    "guardianName": "Jane Doe",
    "guardianContact": 9876543210,
    "createdAt": "2021-04-11T12:34:56.789Z",
    "updatedAt": "2021-04-11T12:34:56.789Z"
  },
  {
    "_id": "6072f01234567890abcdef34",
    "email": "student2@example.com",
    "dateOfBirth": "1991-02-03",
    "mobileNo": 9876543210,
    "faculty": "BCA",
    "semester": 4,
    "firstName": "Jane",
    "lastName": "Smith",
    "address": "456 Avenue",
    "city": "Pokhara",
    "state": "Gandaki",
    "postalCode": 33700,
    "guardianName": "John Smith",
    "guardianContact": 1234567890,
    "createdAt": "2021-04-12T09:08:07.654Z",
    "updatedAt": "2021-04-12T09:08:07.654Z"
  }
]
```

### Get a student by ID

- **Endpoint:** `/students/{studentId}`
- **Method:** GET
- **Response:**

```json
{
  "_id": "6072f01234567890abcdef12",
  "email": "student1@example.com",
  "dateOfBirth": "1990-01-01",
  "mobileNo": 1234567890,
  "faculty": "BIM",
  "semester": 3,
  "firstName": "John",
  "lastName": "Doe",
  "address": "123 Street",
  "city": "Kathmandu",
  "state": "Bagmati",
  "postalCode": 44600,
  "guardianName": "Jane Doe",
  "guardianContact": 9876543210,
  "createdAt": "2021-04-11T12:34:56.789Z",
  "updatedAt": "2021-04-11T12:34:56.789Z"
}
```

### Update a student by ID

- **Endpoint:** `/students/{studentId}`
- **Method:** PATCH
- **Request Body:**

```json
{
  "semester": 4,
  "city": "Biratnagar"
}
```

- **Response:**

```json
{
  "_id": "6072f01234567890abcdef12",
  "email": "student1@example.com",
  "dateOfBirth": "1990-01-01",
  "mobileNo": 1234567890,
  "faculty": "BIM",
  "semester": 4,
  "firstName": "John",
  "lastName": "Doe

",
  "address": "123 Street",
  "city": "Biratnagar",
  "state": "Bagmati",
  "postalCode": 44600,
  "guardianName": "Jane Doe",
  "guardianContact": 9876543210,
  "createdAt": "2021-04-11T12:34:56.789Z",
  "updatedAt": "2021-05-22T08:30:45.678Z"
}
```

### Delete a student by ID

- **Endpoint:** `/students/{studentId}`
- **Method:** DELETE
- **Response:**

```json
{
  "message": "Student deleted successfully."
}
```

## API Testing

This microservice includes API tests using Jest and Supertest. To run the tests, follow these steps:

1. Make sure the microservice is running.

2. Open a terminal and navigate to the cloned repository directory.

3. Run the following command to execute the tests:

```shell
npm test
```

The tests will be executed, and the results will be displayed in the terminal.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
