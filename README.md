# typescript-everywhere
An app scaffold that uses Typescript+Node+React+Express. Allows for simple concurrent frontend & backend development with auto reloading

## Getting started
1. npm install && cd client && npm install && cd ..
2. npm start
3. Go to 0.0.0.0:3000

## Starting from scratch
Here are the steps used to generate this scaffold:

0. Setup
```bash
# Install node
brew install node 
# Install nodemon (for auto reloading of node when files change)
npm install -g nodemon
npm install -g eslint
```

1. Create a Node+Express+typescript app
```bash
# Create project folder & init npm
mkdir test-project
cd test-project
npm init
git init
echo "node_modules/\\nclient/node_modules/" > .gitignore

# Install dependencies
npm install -D typescript
npm install -D tslint
npm install express -S
npm install @types/express -D
npm i --save-dev concurrently

# Set up typsecript configuration
touch tsconfig.json
# Add to file:
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "lib": ["es2015"]
}
# create tslint.json
./node_modules/.bin/tslint --init

# setup package.json
# Add->
"main": "dist/app.js",
```

2. Add sample Express route
```bash
mkdir server
cd server
touch app.ts

# populate app.ts
import express from 'express';

const app = express();
const port = process.env.SERVER_PORT || 3001;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
```

3. Add a React app that uses Typescript
```bash 
# Install react with typescript
cd ..
npx create-react-app client --typescript

# Make sure both apps compile separately
## Add the following to ./tsconfig.json
  "exclude": [
    "./client/*"
  ],

# Make sure the client (react) app uses a differnt port than server
## Add the followign to ./client/package.json
"proxy": "http://localhost:3001/",

# Create a startup script for the react app
touch start-client.js

# Add the following code to that file
const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);
```

4. Set up package.json to have commands to run everything
```bash
# Add the following to ./package.json
  "scripts": {
    "start": "concurrently \"npm run tsx\" \"npm run server\" \"npm run client\" -k",
    "tsx": "tsc --watch",
    "server": "nodemon server.js",
    "client": "node start-client.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```