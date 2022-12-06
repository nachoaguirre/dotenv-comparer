const Files = require('./Files.js');
const Compare = require('./Compare.js');

class DotEnvComparer {
  constructor({envPath='', envDistPath='', environments={}}) {
    this.envPath = envPath;
    this.envDistPath = envDistPath;
    this.environments = environments;
    this.files = new Files(envPath, envDistPath);
    this.compare = new Compare(envPath, envDistPath);
    this.files.checkFiles();
    this.parseResult = this.compare.parseAndCompareEnvs();
  }

  /**
   * Get the variables that are equal between the two files
   * If you pass true as a parameter, it will return the variables with their values, else it will return only the keys
   * @returns {Array}
   */
  getEquals = (showValues=false) => {
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
  getDifferences = () => {
    let result = [];
    Object.entries(this.parseResult.differences).map(([key, value]) => result[key] = {env:value, dist:this.files.getEnvDistValue(key) });
    return result;
  }

  /**
   * Get the variables that are missing in the .env file with the values from the .env.dist file
   * @returns {Array}
   */
  getNews = () => {
    let result = [];
    Object.entries(this.parseResult.news).map(([key, value]) => result[key] = value);
    return result;
  }


  /**
   * Get equal variables, differences and news
   * @returns {Object}
   */
  getAll = () => {
    return {
      'equals': this.getEquals(),
      'differences': this.getDifferences(),
      'news': this.getNews(),
    }
  }

  /**
   * Add the keys not present in the .env file from the .env.dist file
   * If you pass false as a parameter, it will not add a comment in .env file with import datetime
   * @returns {Number} Number of variables imported
   */
  addMissing = (addImportBanner=true) => {
    let news = this.parseResult.news;
    let amount = Object.keys(news).length;
    if(amount > 0) {
      if(addImportBanner) { this.files.writeImportBanner(); }
      for(let key in news){ this.files.writeEnvValue(key, news[key]); }
      this.parseResult = this.compare.parseAndCompareEnvs();
      return amount;
    }
    else { return 0; }
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
}

module.exports = DotEnvComparer;
