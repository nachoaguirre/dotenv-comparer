# dotenv-tools
 Tools for .env files

## Installation
Add the npm package to your project
`npm install dotenv-tools``

## Coniguration
```
const DotEnvTools = require('dotenv-tools');
const envTools = new DotEnvTools({
  envPath: './.env',
  envDistPath: './.env.dist',
});

console.log(envTools.getAll());
```
