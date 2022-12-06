// 1. Load the main class. Either from the NPM package or from the source code.
const DotEnvComparer = require('../index.js');
// or
// const DotEnvComparer = require('dotenv-comparer');

// 2. Create an instance of the class.
//   The constructor requires an object with the following properties:
//   - envPath: The path to the .env file. You can set the path relative at this script, or an absolute path.
//   - envDistPath: The path to the .env.dist file. You can set the path relative at this script, or an absolute path.
const dotEnvComparer = new DotEnvComparer({
    envPath: __dirname + '/.env',
    envDistPath: __dirname + '/.env.dist',
});

// 3. Synchronize the values of the .env file with the values of the .env.dist file.
//   This will overwrite the values of the .env file with the values of the .env.dist file.
//   The result is an number with the amount of variables reseted in the .env file.

// Uncomment the following line to execute the symc.
let syncVariables = dotEnvComparer.resetCustoms();
// Uncomment the following line to see the result in the console.
console.log('Reseted custom variables: ',syncVariables);
