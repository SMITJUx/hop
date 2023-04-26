![hop](./public/img/banner.svg "hop")
# API hop
## Routes
### Authentication
| REQUEST  | ROUTE                  | DESCRIPTION                                          |
| -------- | ---------------------- | ---------------------------------------------------- |
| __POST__ | **/api/auth/login**    | Login and receive an access and a refresh JWT token. |
| __POST__ | **/api/auth/register** | Create an account.                                   |
| __GET__  | **/api/auth/refresh**  | Refresh your JWT access token.                       |

### Users
| REQUEST | ROUTE                    | DESCRIPTION                                                                  |
| ------- | ------------------------ | ---------------------------------------------------------------------------- |
| __GET__ | **/api/users/me**        | Get information about your account.                                          |
| __GET__ | **/api/users/:username** | Get information about a user account (**only if you are an administrator**). |

### Travels
| REQUEST    | ROUTE                             | DESCRIPTION                     |
| ---------- | --------------------------------- | ------------------------------- |
| __GET__    | **/api/travels**                  | Get all travels.                |
| __POST__   | **/api/travels**                  | Create a new travel.            |
| __DELETE__ | **/api/travels**                  | Delete all travels.             |
| __GET__    | **/api/travels/:id**              | Get a specific travel.          |
| __DELETE__ | **/api/travels/:id**              | Delete a specific travel.       |
| __GET__    | **/api/travels/best-flights/:id** | Find best flights for a travel. |

