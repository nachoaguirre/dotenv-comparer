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


// 3. Get the parse between the .env and .env.dist files.
//   The result is an object with the following properties:
//   - equals: An object with the variables that are equal in both files.
//   - differences: An object with the variables that are different in both files.
//   - news: An object with the variables that are only in the .env.dist file.
const getAll = dotEnvComparer.getAll().then((res) => {
    // Uncomment the following line to see the result in the console.
    console.log(res);
    // You can also get the result of each parse separately.
    //console.log(res.equals);
    //console.log(res.differences);
    //console.log(res.news);
});


// 4. Get the parse only for new variables between the .env and .env.dist files.
const news = dotEnvComparer.getNews().then((res) => {
    // Uncomment the following line to see the result in the console.
    //console.log('New values from .env.dist:', res);
});


// 5. Get the parse only for different variables between the .env and .env.dist files.
const differences = dotEnvComparer.getDifferences().then((res) => {
    // Uncomment the following line to see the result in the console.
    //console.log('Different values:', res);
});


// 6. Get the parse only for equal variables between the .env and .env.dist files.
const equalsOnlyKeys = dotEnvComparer.getEquals().then((res) => {
    // Uncomment the following lines to see the result in the console.
    //console.log('Equal only keys:', res);
})
const equalsShowValues = dotEnvComparer.getEquals(true).then((res) => {
    //console.log('Equal showing Values:', res);
});

