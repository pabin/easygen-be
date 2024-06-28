## Project Setup Steps

### Clone Project Repository
```
git clone https://github.com/pabin/easygen-be.git
cd easygen-be
```

### Setting up node and yarn

- Install nvm and node:

> NOTE: Restart terminal after nvm installation

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 18.16.1
nvm use 18
```

- Install yarn:

```
npm install -g yarn@1.22.19
```

### Install dependencies and start project
```
yarn
yarn start:dev
```

### Setup .env file with following key and respective values
```
DATABASE=your_mongodb_host eg: mongodb://localhost/easygendb
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_VALIDITY=access_token_validty_in_seconds
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_VALIDITY=refresh_token_validty_in_seconds
```

### Demo VIDEO
https://drive.google.com/file/d/1JalfbJTIbTSJjbWwzFb0z-YJhC6H1RzK/view?usp=sharing

### TO DO
- Unit tests:

