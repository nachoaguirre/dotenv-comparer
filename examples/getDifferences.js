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


// 3. Get the parse between the .env and .env.dist files.
//   The result is an object with the following properties:
//   - equals: An object with the variables that are equal in both files.
//   - differences: An object with the variables that are different in both files.
//   - news: An object with the variables that are only in the .env.dist file.
const parseAll = dotEnvTools.parseAll();
// Uncomment the following line to see the result in the console.
console.log(parseAll);

// You can also get the result of each parse separately.
//console.log(parseAll.equals);
//console.log(parseAll.differences);
//console.log(parseAll.news);


// 4. Get the parse only for new variables between the .env and .env.dist files.
const news = dotEnvTools.parseNews();
// Uncomment the following line to see the result in the console.
//console.log(news);

// 5. Get the parse only for different variables between the .env and .env.dist files.
const differences = dotEnvTools.parseDifferences();
// Uncomment the following line to see the result in the console.
//console.log(differences);

// 6. Get the parse only for equal variables between the .env and .env.dist files.
const equals = dotEnvTools.parseEquals();
// Uncomment the following line to see the result in the console.
//console.log(equals);


// 7. Import the new variables from the .env.dist file to the .env file.
//   The new variables will be added at the end of the .env file.
//   The new variables will be added with the following format:
//   - A comment with the date and time of the import.
//   - The variable name.
//   - The variable value.
//   - A blank line.
//dotEnvTools.importNewVariables();
