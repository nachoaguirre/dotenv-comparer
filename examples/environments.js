// 1. Load the main class. Either from the NPM package or from the source code.
const DotEnvComparer = require('../index.js');
// or
// const DotEnvComparer = require('dotenv-comparer');

// 2. Set an object with your environment variables.
// The keys is the name of the environment (name as you want), and the values is objects with the variables for that environment.
// Try to use the same variable names for all environments.
let myEnvironments = {
    'development': {
        'KEY_FOR_ENVIRONMENT_ONE': 'The value for environment one in DEVELOPMENT',
        'KEY_FOR_ENVIRONMENT_TWO': 'The value for environment two in DEVELOPMENT',
        'KEY_FOR_ENVIRONMENT_THREE': 'The value for environment three in DEVELOPMENT',
        'KEY_FOR_ENVIRONMENT_FOUR': 'The value for environment four in DEVELOPMENT',
    },
    'staging': {
        'KEY_FOR_ENVIRONMENT_ONE': 'This value could be for staging',
        'KEY_FOR_ENVIRONMENT_TWO': 'The value for environment two in STAGING',
        'KEY_FOR_ENVIRONMENT_THREE': 'The value for environment three in STAGING',
    },
    'production': {
        'KEY_FOR_ENVIRONMENT_ONE': 'The value for environment one in PRODUCTION',
        'KEY_FOR_ENVIRONMENT_TWO': 'The value for environment two in PRODUCTION',
        'KEY_FOR_ENVIRONMENT_THREE': 'The value for environment three in PRODUCTION',
    }
}

// 3. Create an instance of the class.
//   The constructor requires an object with the following properties:
//   - envPath: The path to the .env file. You can set the path relative at this script, or an absolute path.
//   - envDistPath: The path to the .env.dist file. You can set the path relative at this script, or an absolute path.
//   - environmentsObj: The object with the environments variables.
const dotEnvComparer = new DotEnvComparer({
    envPath: __dirname + '/.env',
    envDistPath: __dirname + '/.env.dist',
    environmentsObj: myEnvironments
});

// let mientorno = 'development';
// let mivalor = 'KEY_FOR_ENVIRONMENT_ONE';
// console.log(myEnvironments[mientorno][mivalor]);

// let value_one = dotEnvComparer.getEnvironmentValue('production', 'KEY_FOR_ENVIRONMENT_ONE');
// console.log("My Environment value one", value_one);

// let compare_values = dotEnvComparer.compareEnvironmentWithCurrent('production', 'KEY_FOR_ENVIRONMENT_ONE');
// console.log("My Environment compare value one", compare_values);

// let names = dotEnvComparer.getEnvironmentNames();
// console.log("My Environment names", names);

let infoScwitch = dotEnvComparer.infoSwitchEnvironment('development');
console.log("My info switch", infoScwitch);




// 3. Get the parse between the .env and .env.dist files.
//   The result is an object with the following properties:
//   - equals: An object with the variables that are equal in both files.
//   - differences: An object with the variables that are different in both files.
//   - news: An object with the variables that are only in the .env.dist file.
//const getAll = dotEnvComparer.getAll();
// Uncomment the following line to see the result in the console.
//console.log(getAll);

// You can also get the result of each parse separately.
//console.log(getAll.equals);
//console.log(getAll.differences);
//console.log(getAll.news);
