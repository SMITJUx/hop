# Hop API

## Routes
### Authentication
| Request | Route              | Description                                          |
| ------- | ------------------ | ---------------------------------------------------- |
| POST    | /api/auth/login    | Login and receive an access and a refresh JWT token. |
| POST    | /api/auth/register | Create an account.                                   |
| GET     | /api/auth/refresh  | Refresh your JWT access token.                       |

### Users
| Request | Route                | Description                                                                  |
| ------- | -------------------- | ---------------------------------------------------------------------------- |
| GET     | /api/users/me        | Get information about your account.                                          |
| GET     | /api/users/:username | Get information about a user account (**only if you are an administrator**). |

### Travels
| Request | Route                         | Description                     |
| ------- | ----------------------------- | ------------------------------- |
| GET     | /api/travels                  | Get all travels.                |
| POST    | /api/travels                  | Create a new travel.            |
| DELETE  | /api/travels                  | Delete all travels.             |
| GET     | /api/travels/:id              | Get a specific travel.          |
| DELETE  | /api/travels/:id              | Delete a specific travel.       |
| GET     | /api/travels/best-flights/:id | Find best flights for a travel. |

