![hop](./public/img/banner.svg 'hop')

# API hop

## Routes

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
