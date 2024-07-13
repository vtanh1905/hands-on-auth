
# Hands On Auth

## Installation

**Client**

Install with npm
```bash
    cd client
    npm install
```

**Server**

Install with npm
```bash
    cd server
    npm install
```

**Note** using Nodejs Version `18.12.0`

## Environment Variables
To run this project, you will need to add the following environment variables to your .env file at the root of the repository

`NODE_ENV` : Environment we run the application (e.g, "development" or "production")

`PORT_WEBPACK_SERVER` : Port we start the client side of application to develop

`API_URL` : The URL of Web Api

`PORT` : The application starts on this port number

`DATABASE_URL` : Database URL (e.g, postgresql://[username]:[password]@[hostname]:[port]/[database])

`DATABASE_SSL` : Turn on or off SSL when connecting to Database

`JWT_KEY` : The private key of Json Web Token

`ACCESS_CONTROL_ALLOW_ORIGIN` : the response can be shared with requesting code from the given origin (e.g, * or URL)


## Run Locally
**Note** : we must have the .env file at the root of the repository (we are able to clone the .env.example and rename it to .env)
### # With docker-compose
Go to the project directory
```bash
  docker-compose up
```

### # Without docker-compose

#### Step 1: Set Up Database
**Using Docker**
```bash
  docker pull postgres
  docker run --name my-postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=123456 postgres
```
**Not Using Docker**
Access the link and downkload postgresql version 15.2, then install it
(https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

#### Step 2: Initialize Schemas And Seed Data
Go to the project directory

```bash
  cd server
  npm run database:init
```
**Note :** After we run the above scripts, if the log shows the same the below image. It was successful.

![image](https://github.com/vtanh1905/youtube-video-sharing/assets/49771724/7e3a638d-b3d8-4ad1-9511-533a0a2341e9)

#### (Option 1) Step 3: Start Application
Go to the project directory
**Client**
```bash
  cd client
  npm run build
```

**Server**
```bash
  cd server
  npm run build
  npm run start
```

#### (Option 2) Step 3: Start Application with using Webpack-Dev-Server (recommend for coding)
**Client**
```bash
  cd client
  npm run start
```
**Note**: using webpack-dev-server to host client and the client call API from the server

**Server**
```bash
  cd server
  npm run build
  npm run start
```

## Running Tests

To run tests, run the following command

**Client**
```bash
  cd client
  npm run test
```

**Server**
```bash
  cd server
  npm run test
```
