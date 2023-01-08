const Files = require('./Files.js');
const Compare = require('./Compare.js');
const Environments = require('./Environments.js');

class DotEnvComparer {
  constructor({envPath='', envDistPath='', environmentsObj={}}) {
    this.envPath = envPath;
    this.envDistPath = envDistPath;
    this.environmentsObj = environmentsObj;
    this.files = new Files(envPath, envDistPath);
    this.compare = new Compare(envPath, envDistPath);
    this.environments = new Environments(envPath, envDistPath, environmentsObj);
    this.files.checkFiles();
    this.parseResult;
  }

  parseFiles = async () => {
    return await this.compare.parseAndCompareEnvs().then((res) => {
      this.parseResult = res;
      return res;
    })
  }

  /**
   * Get the variables that are equal between the two files
   * If you pass true as a parameter, it will return the variables with their values, else it will return only the keys
   * @returns {Array}
   */
  getEquals = async (showValues=false) => {
    if(this.parseResult === undefined) {
      this.parseResult = await this.parseFiles().then((res) => { return res; })
    }

    if(showValues) {
      let result = [];
      Object.entries(this.parseResult.equals).map(([key, value]) => { return result[key] = value; });
      return result;
    }

    return Object.keys(this.parseResult.equals);
  }

  /**
   * Get the differences between the .env and .env.dist files
   * Returns an array with objects for each variable with the following structure:
   * [
   *   VARIABLE_NAME: {
   *     env: 'value from .env',
   *     dist: 'value from .env.dist'
   *   }
   * ]
   * If there are no differences, an empty array is returned
   * @returns {Array}
   */
  getDifferences = async () => {
    if(this.parseResult === undefined) {
      this.parseResult = await this.parseFiles().then((res) => { return res; })
    }

    let result = [];
    Object.entries(this.parseResult.differences).map(([key, value]) => result[key] = {env:value, dist:this.files.getEnvDistValue(key) });
    return result;
  }

  /**
   * Get the variables that are missing in the .env file with the values from the .env.dist file
   * @returns {Array}
   */
  getNews = async () => {
    if(this.parseResult === undefined) {
      this.parseResult = await this.parseFiles().then((res) => { return res; })
    }

    let result = [];
    Object.entries(this.parseResult.news).map(([key, value]) => result[key] = value);
    return result;
  }


  /**
   * Get equal variables, differences and news
   * @returns {Object}
   */
  getAll = async () => {
    return await {
      'equals': await this.getEquals(),
      'differences': await this.getDifferences(),
      'news': await this.getNews(),
    }
  }

  /**
   * Add the keys not present in the .env file from the .env.dist file
   * If you pass false as a parameter, it will not add a comment in .env file with import datetime
   * @returns {Number} Number of variables imported
   */
  addMissing = async (addImportBanner=true) => {
    if(this.parseResult === undefined) {
      this.parseResult = await this.parseFiles().then((res) => { return res; })
    }

    let news = this.parseResult.news;
    let amount = Object.keys(news).length;
    if(amount > 0) {
      if(addImportBanner) { this.files.writeImportBanner(); }
      for(let key in news){ this.files.writeEnvValue(key, news[key]); }
      //this.parseResult = this.compare.parseAndCompareEnvs();
      this.parseResult = await this.parseFiles().then((res) => { return res; });
      return amount;
    } else { return 0; }
  }

  /**
   * If different values are set in .env file, it will replace them with the values from .env.dist file
   * @returns {Number} Number of variables reseted in .env file
   */
  resetCustoms () {
    let variables = this.parseResult.differences;
    let amount = Object.keys(variables).length;
    if(amount > 0) {
      for(let key  in variables){ this.files.writeEnvValue(key, this.files.getEnvDistValue(key)); }
      this.parseResult = this.compare.parseAndCompareEnvs();
      return amount;
    }
    else { return 0; }
  }

  getEnvironmentNames = () => {
    // if(this.environments.checkEnvironmentName(envName)) {
    //   //return this.environmentsObj[envName][variableName];
    // }
    let result = [];
    for(let name in this.environmentsObj) {
      result.push(name);
      // environmentsOptions += `
      //   ${i}. Switch values to "${env}" environment`;
      // i++;
    }
    return result;
  }

  getEnvironmentValue = (envName, variableName) => {
    if(this.environments.checkEnvironmentName(envName, variableName)) {
      return this.environmentsObj[envName][variableName];
    }
  }

  compareEnvironmentWithCurrent = (envName, variableName) => {
    if(this.environments.checkEnvironmentName(envName, variableName)) {
      let result = {};
      result[envName] = this.environmentsObj[envName][variableName];
      result['current'] = this.files.getEnvValue(variableName);
      return result;
    }
  }

  infoSwitchEnvironment = (envName) => {
    let result = {};
    let variables = this.environmentsObj[envName];

    let equalsWithCurrent = [];
    let differencesWithCurrent = [];
    let newsWithCurrent = [];

    let differencesWithCurrentArr = [];
    let newsWithCurrentArr = [];

    for(let [key, val] in variables) {
      let current = this.files.getEnvValue(key);
      if(current == undefined) {
        newsWithCurrent[key] = {'New Value to Add': val};
        newsWithCurrentArr[key] = variables[key];
      }
      else if(current != variables[key]) {
        differencesWithCurrent[key] = {'Current Value': current, 'New Value': val};
        differencesWithCurrentArr[key] = variables[key];
      }
      else {
        equalsWithCurrent[key] = {'Current Value': current, 'New Value': val};
      }
    }

    let equalsWithCurrentCount = Object.keys(equalsWithCurrent).length;
    let differencesWithCurrentCount = Object.keys(differencesWithCurrent).length;
    let newsWithCurrentCount = Object.keys(newsWithCurrent).length;

    if(equalsWithCurrentCount == 0 && differencesWithCurrentCount == 0 && newsWithCurrentCount == 0) {
        return 'There are no variables to switch in the ' + envName + ' environment... No equal variables, no differences and no news...';
    }
    else {
      if(equalsWithCurrentCount > 0) {
        result['equals'] = {};
        result['equals']['type'] = 'Equal Variables and values betwen environtmentObj and .env file';
        result['equals']['count'] = equalsWithCurrentCount;
        result['equals']['status'] = `VARIABLES WITHOUT CHANGE :: The following variables will remain with the same value`;
        result['equals']['variables'] = equalsWithCurrent;
      }

      if(newsWithCurrentCount > 0) {
        result['news'] = {};
        result['news']['type'] = `Variables not present in .env file with be set with values from the ${envName} environment`;
        result['news']['count'] = `${newsWithCurrentCount}`;
        result['news']['status'] = `NEW VARIABLES TO ADD IN .ENV FILE :: The following variables will be added, since they are not present in your .env file`;
        result['news']['variables'] = newsWithCurrent;
      }

      if(differencesWithCurrentCount > 0) {
        result['differences'] = {};
        result['differences']['type'] = `Variables not present in .env file with be set with values from the ${envName} environment`;
        result['differences']['count'] = `${differencesWithCurrentCount}`;
        result['differences']['status'] = `VARIABLES TO UPDATE IN .ENV FILE :: The following variables will be replaced with the values of your environmentsObj`;
        result['differences']['variables'] = differencesWithCurrent;
      } else {
        result['differences'] = {};
        result['differences']['count'] = 0;
        result['differences']['status'] = `No variables to update with different or new values from ${envName} environment`;
      }



      return result;
    }





  }

}

module.exports = DotEnvComparer;
