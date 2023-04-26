![hop](./public/img/banner.svg 'hop')

# API hop

Looking for the best flight deals easily? Hop is a simple API that will look for the best flights for your travels. 
Users can register for an account and log in to search for flights from an origin to a destination for a given date. The information is extracted from the FlightLabs API.

# Content
- [Pre-requisites](#Pre-requisites)
- [Getting started](#getting-started)
- [Test and Deploy](#test-and-deploy)
- [Features](#Features)
- [Technologies](#Technologies)
- [Contributing](#contributing)

# Pre-requisites

To run this API locally, you only need to have Docker and Docker Compose!

# Getting started

- Clone the repository 
```bash
git clone  https://gitlab.com/group.js/hop.js <project_name>
```
- Set a `.env` file in the root of the project
```bash
cd <project_name>
touch .env
```

- Set your environment variables in the `.env` file, here you can find an example!
```bash
# Set project environnement to dev since it will be locally.
NODE_ENV=dev

# App settings.
PORT=3000

# MongoDB connection settings.
DB_HOST=mongo
DB_PORT=27017
DB_NAME=mydb
DB_USER=myuser
DB_PASSWORD=mypassword
ROOT_DB_USERNAME=myroot
ROOT_DB_PASSWORD=myroot

# Authentication key pair used for JWT tokens (use a random base64 string generator to make these keys).
ACCESS_TOKEN_PRIVATE_KEY=IL/a1vaS5Kdtrx2uS/hYUQ==
REFRESH_TOKEN_PRIVATE_KEY=ZiCmksTdwzs3K9Jc0rR70g==

# Flight API.
BASE_URL=https://app.goflightlabs.com
# Get your own API key on FlightLabs.
API_KEY=XwrLBcRopx8_Bd9BVLuFC7EE0jb9gZku3XouhAV8I90FPeaq8CdqSgsq1yJanT6-ZHz7dAzNoSyQp0-je_SadCb4amRRqBd-8RnL3O0tAtIV_hGiXTZj
```

- Build and run the project

```bash
docker-compose up --force-recreate --build
```

# Test and Deploy

We have used the built-in continuous integration in GitLab.

- [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)
 
# Technologies 
### Backend
- Node.js 
- Express.js 

### Database  
- MongoDB

### Server
- AWS EC2

### Web Server
- Nginx

#### Security 
- HTTPS
- Passport.js (JWT)
- Helmet
- CORS
- Rate Limit  
- SAST

### Containerization
- Docker 

# Features 
 - Register an account 
 - Login to an account 
 - Refresh a token 
 - Search a travel 
 - Get all your travel search
 - Delete travels or a specific travel 
 - Find the best flights for your travel!

# Routes

### Authentication

| REQUEST  | ROUTE                  | DESCRIPTION                                          |
| -------- | ---------------------- | ---------------------------------------------------- |
| **POST** | **/api/auth/login**    | Login and receive an access and a refresh JWT token. |
| **POST** | **/api/auth/register** | Create an account.                                   |
| **GET**  | **/api/auth/refresh**  | Refresh your JWT access token.                       |
| **GET**  | **/api/auth/logout**   | Logout user and revoke refresh token.                |

### Users

| REQUEST | ROUTE                    | DESCRIPTION                                                                  |
| ------- | ------------------------ | ---------------------------------------------------------------------------- |
| **GET** | **/api/users/me**        | Get information about your account.                                          |
| **GET** | **/api/users/:username** | Get information about a user account (**only if you are an administrator**). |

### Travels

| REQUEST    | ROUTE                             | DESCRIPTION                     |
| ---------- | --------------------------------- | ------------------------------- |
| **GET**    | **/api/travels**                  | Get all travels.                |
| **POST**   | **/api/travels**                  | Create a new travel.            |
| **DELETE** | **/api/travels**                  | Delete all travels.             |
| **GET**    | **/api/travels/:id**              | Get a specific travel.          |
| **DELETE** | **/api/travels/:id**              | Delete a specific travel.       |
| **GET**    | **/api/travels/best-flights/:id** | Find best flights for a travel. |

## License
- MIT License

## Authors 
- Samir J. 
- Sabrina S.