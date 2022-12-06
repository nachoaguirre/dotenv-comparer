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

// 3. Import the new variables from the .env.dist file to the .env file.
//   The new variables will be added at the end of the .env file.
//   The new variables will be added with the following format:
//   - A comment with the date and time of the import.
//   - variable_name = variable_value
//   - A blank line.
//   The result is an number with the amount of variables imported.
//
// You can skip adding the comment with the date and time of the import by adding a parameter as false.

// Uncomment the following line to execute the import.
let addedVariables = dotEnvComparer.addMissing();
// Uncomment the following line to see the result in the console.
console.log('New variables added:',addedVariables);
