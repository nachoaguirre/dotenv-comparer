// 1. Load the main class. Either from the NPM package or from the source code.
const DotEnvTools = require('../index.js');

// 2. Create an instance of the class.
//   The constructor requires an object with the following properties:
//   - envPath: The path to the .env file. You can set the path relative at this script, or an absolute path.
//   - envDistPath: The path to the .env.dist file. You can set the path relative at this script, or an absolute path.
const dotEnvTools = new DotEnvTools({
    envPath: __dirname + '/.env',
    envDistPath: __dirname + '/.env.dist',
});

// 3. Synchronize the values of the .env file with the values of the .env.dist file.
//   This will overwrite the values of the .env file with the values of the .env.dist file.
//   Think about this as a "reset" of the .env file.
//   The result is an number with the amount of variables synchronized.

// Uncomment the following line to execute the symc.
//let syncVariables = dotEnvTools.syncVariables();
// Uncomment the following line to see the result in the console.
//console.log(syncVariables);
