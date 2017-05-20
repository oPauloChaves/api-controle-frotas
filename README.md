# Controle Frotas Project
REST API for Controle Frotas Web App

## Quick start

### Clone the project
```sh
git clone git@github.com:opaulochaves/api-controle-frotas.git
```

### Install all dependencies
```sh
yarn install
```

### Run in dev mode
```sh
yarn run dev
```

### Run in production mode
```sh
yarn start
```

-------------------------------------

## API Endpoints

- All API endpoints are prefixed with `/api`
- The API only works with JSON
- Only these endpoints don't need authentication:
  - `/`
  - `/auth/login`
- For all the other endpoints you need to authenticate. You need to set a header `Authorization` with `Bearer your-token`

</summary>
<details>
<summary><b>/</b> GET - Check if the API is up and running</summary>

</details>

<details>
<summary><b>/auth/login</b> POST - Logs a user in</summary>

- Request body

  ```json
  {
    "email": "paul@email.com",
    "password": "12345"
  }
  ```

- Response

  ```json
  {
    "token": "your-token",
    "email": "paul@email.com"
  }
  ```

</details>

<details>
<summary><b>/users</b> POST - Register a new user</summary>

- Constraints
  - The user email is unique
- Fields
  - `name [required]`
  - `email [required]`
  - `password [required]`
- Request body

  ```json
  {
    "name": "Paul",
    "email": "paul@email.com",
    "password": "12345"
  }
  ```
- Response

  - **201** - Created
  
    ```json
    {
      "token": "your-token",
      "email": "paul@email.com"
    }
    ```
    
</details>

<details>
<summary><b>/users</b> GET - List users</summary>

- Response

  ```json
  [
    {
      "_id": "58b59c61c537a718e6255bf5",
      "updatedAt": "2017-02-28T15:50:57.310Z",
      "createdAt": "2017-02-28T15:50:57.310Z",
      "name": "Paul",
      "email": "paul@email.com"
    }
  ]
  ```
</details>

### Useful resources
- [Managing Environment Variables in Node.js](https://medium.com/@rafaelvidaurre/managing-environment-variables-in-node-js-2cb45a55195f)
- [sahat/hackathon-starter](https://github.com/sahat/hackathon-starter/)
