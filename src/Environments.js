const fs = require('fs');

class Environments {
  constructor(envPath, envDistPath, environmentsObj) {
    this.envPath = envPath;
    this.envDistPath = envDistPath;
    this.environmentsObj = environmentsObj;
  }

  checkEnvironmentName = (envName, variableName='') => {
    if (!this.environmentsObj[envName]) {
      throw new Error(`Environment ${envName} does not exist`);
    }

    if(variableName !== '') {
      this.checkEnvironmentKey(envName, variableName);
    }

    return true;
  }

  checkEnvironmentKey = (envName, variableName) => {
    if(!this.environmentsObj[envName][variableName]) {
      throw new Error(`Variable ${variableName} does not exist in environment ${envName}`);
    }

    return true;
  }

}

module.exports = Environments;
