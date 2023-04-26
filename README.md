![hop](./public/img/banner.svg 'hop')

# API hop

Looking for the best flight deals easily? Hop is a simple API that will look for the best, cheapest, fastest and direct flight. 
Users can register for an account and log in to search for flights from an origin to a destination for a given date. The information is extracted from the FlightLabs API.

# Content
- [Pre-requisites](#Pre-requisites)
- [Getting started](#getting-started)
- [Test and Deploy](#test-and-deploy)
- [Features](#Features)
- [Technologies](#Technologies)
- [Contributing](#contributing)

# Pre-requisites

Install Node.js, Docker and MongoDB


# Getting started


- Clone the repository 
```bash
git clone  <git lab template url> <project_name>
```
- Install dependencies
```bash
cd <project_name>
npm install
```
- Build and run the project

```bash
npm run
```
- Activate docker 
```bash
docker-compose up 
```


# Test and Deploy


We have used the built-in continuous integration in GitLab.

- [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)


 
# Technologies 
### Backend
- Node.js 
- Express 

### Database  
- MongoDB
#### Security 
- HTTPS
- Passport.js (JWT)
- Helmet
- CORS
- Rate Limit  

### Containerization
- Docker 

# Features 
 - Register an account 
 - Login to an account 
 - Refresh a token 
 - Search a travel 
 - Get all your travel search
 - Delete travels or a specific travel 

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

# Contributing

## License
- MIT License

## Authors 
- Samir Jout 
- Sabrina Sandirasegarane