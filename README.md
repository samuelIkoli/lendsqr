# lendsqr
A simple wallet service. Auth, payments, e.t.c

## 📁 Project Configuration

The project is divided into:

- Controllers: found in `src/controller` folder. The functions that get executed when the endpoints are called is defined here.

- Model: found in `src/model` directory. Typescript interfaces to enforce types.

- Test: found in `src/test` directory. Test scripts to test all (or at least the major ones ) endpoints.

- Routes: found in `src/routes` directory. URL endpoints and their corresponding method/action.


## Getting Started: Running the Server

### 🔧 Tech Stack

- NodeJS
- ExpressJS
- MySQL
- Typescript
- KnexJS

### 📝 Requirements

This project requires nodeJS version >= 14 and npm package manager.

### 💻 Running Locally

1. Clone this repository by running:
   ```bash
   git clone https://github.com/samuelIkoli/lendsqr.git
   cd lendsqr
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Using the `.env_sample` template, create a `.env` file and fill in the values for each environment variables.
4. Start the server in dev mode:
   ```bash
   npm run start
   ```


### 💻 Testing

Tests can be carried out locally by running:

```bash
npm run test
```

Alternatively, online API testing tools such as **Postman** and **Thunderclient** can be used to test the endpoints.



### 📩 Request

- Accepts JSON only.
- Request body should **only** contain the specified values and follow the database schema.
- Example request:
  ```json
  {
    "name": "NAME"
  }
  ```

### 📂 Response

Returns JSON.

### ⚠️ Response Status

- 200 - OK: User or resource has been successfully updated.
- 201 - Created: User or resource has been successfully created.
- 400 - Bad Request:
  - Request body has more than the specified attribute.
  - Invalid content-Type.
- 403 - Unauthorized: A user is not authenticated
- 404 - User or Resource Not Found.
- 500 - Internal Server Error.


## 📖 Documentation


Documentation can be found in `/api-docs` endpoint.

Documentation can be found [here](https://github.com/hngx-org/Fortress-events-backend/tree/main/routeDocs)


## 🔗 Links

* [Server URL](http://ec2-18-119-101-235.us-east-2.compute.amazonaws.com:3000/)

Built by SAMUEL IKOLI