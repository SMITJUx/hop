# Contributing to hop

## Development Workflow

### Branches

First, let's see the different types of branch used in the developement worklow with their permissions for a user with the `Developer` role.

| Branches       |      Allow To Push       |      Allow To Merge      |     Allow Push Force     |
| -------------- | :----------------------: | :----------------------: | :----------------------: |
| **master**     | :heavy_multiplication_x: | :heavy_multiplication_x: | :heavy_multiplication_x: |
| **release**    | :heavy_multiplication_x: | :heavy_multiplication_x: | :heavy_multiplication_x: |
| **develop**    | :heavy_multiplication_x: | :heavy_multiplication_x: | :heavy_multiplication_x: |
| **feature/\*** |    :heavy_check_mark:    |    :heavy_check_mark:    |    :heavy_check_mark:    |

### Commits Convention

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history. This convention gives details by describing the features, fixes, and breaking changes made in commit messages

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The `<type>` tag can be filled using `init:`, `fix:`, `feat:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`.

For more information about the convention, check the specification on [Convetional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification).

### Workflow

#### Create a new feature

Always get the latest version of the `develop` branch before starting a feature!

```Bash
git checkout develop                # If not already on develop
git pull origin develop             # Pull the latest version of develop
```

We can now create our new feature branch.

```Bash
git checkout -b feature/helloworld  # Create and checkout on the feature/helloworld branch
```

\***\*Also, it's important to note that you always need to write unit tests related to your feature. Before pushing your feature branch, always execute unit tests and check your code format using a linter.\*\***

```Bash
npm run test                        # Non-regression tests
npm run lint                        # Code format checking
```

Then you can push your branch using the command below.

```Bash
git push -u origin helloworld       # Push your branch while setting the up stream
```

When you finished your work on the feature, you can create a new `Merge Request` to add your work on the `develop` branch.
If your `Merge Request` is blocked because of conflicts, you will have to rebase your branch on the latest version of `develop`.

```Bash
git checkout develop                # If not already on develop
git pull origin develop             # Pull the latest version of develop
git checkout feature/helloworld     # Go back on your feature branch
git rebase -i develop               # Rebase your feature branch on develop and fix your conflicts
git push -f                         # Force push your rebased branch
```

Your `Merge Request` will then be reviewed before being merged in the `develop` branch.

## Development Setup

### Pre-requisites

To run this API locally, you only need to have Docker and Docker Compose!

### Getting Started

-   Clone the repository

```bash
git clone  <repository_url> <project_name>
```

-   Set a `.env` file in the root of the project

```bash
cd <project_name>
touch .env
```

-   Set your environment variables in the `.env` file, here you can find an example!

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

-   Build and run the project

```bash
docker-compose up --force-recreate --build
```