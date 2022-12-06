# dotenv-comparer
Tool for comparing and sync values between .env and .env.dist files

## Install
```sh
npm install dotenv-comparer
```

## Usage

```js
const DotEnvComparer = require('dotenv-comparer');

const dotEnvComparer = new DotEnvComparer({
  envPath: './.env',
  envDistPath: './.env.dist',
});

let newVariables = dotEnvComparer.getNews();
console.log(newVariables);
//=> returns an array of new variables

let differences = dotEnvComparer.getDifferences();
console.log(differences);
//=> returns an array of differences between .env and .env.dist

let addedVariables = dotEnvComparer.addMissing();
console.log(addedVariables);
//=> returns the amount of added variables from .env.dist into .env
```

You can view more examples in the [examples](https://github.com/nachoaguirre/dotenv-comparer/tree/main/examples) folder.