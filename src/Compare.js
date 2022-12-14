//const fs = require('fs');
const fs = require('fs/promises');

class Compare {
  constructor(envPath, envDistPath) {
    this.envPath = envPath;
    this.envDistPath = envDistPath;
  }

  parseAndCompareEnvs = async () => {
    let envFile = await fs.readFile(this.envPath, 'utf-8');
    envFile = envFile.split('\n');

    let envDistFile = await fs.readFile(this.envDistPath, 'utf-8');
    envDistFile = envDistFile.split('\n');

    let envObj = {};
    let envDistObj = {};

    for (const line of envFile) {
      if (line.startsWith('#') || line == '') continue;
      let [key, value] = line.split('=');
      envObj[key] = value;
    }

    for (const line of envDistFile) {
      if (line.startsWith('#') || line == '') continue;
      let [key, value] = line.split('=');
      envDistObj[key] = value;
    }

    let equals = {};
    let differences = {};
    let news = {};

    let getDifferences = this.#checkDiff(envDistObj, envObj);

    for (var key in envDistObj) {
      if(Object.is(envDistObj[key], envObj[key])) { equals[key] = envDistObj[key]; }
      else if(getDifferences != 'equals') {
        if(getDifferences[key] === undefined) { news[key] = envDistObj[key]; }
        else { differences[key] = envObj[key]; }
      }
    }

    return { equals: equals, differences: differences, news: news};
  }

  #checkDiff = (o1,o2) => {
    const typeObject = function(o){ return typeof o === 'object'; };
    const check = function(o1, o2) {
      const result = {};

      if (!typeObject(o1) && typeObject(o2)) { return o2; }
      else if (typeObject(o1) && !typeObject(o2)) { return o1; }
      else if (Object.is(o1, o2)) { return 'equals'; }

      const keys = Object.keys(o1);

      for (let i=0; i<keys.length; i++) {
        const key = keys[i];
        if ( typeObject(o1[key]) && typeObject(o2[key])) {
          if ( Object.is(o1[key], o2[key]) ) { /* empty */ }
          else if (o1[key] === o2[key]) { /* empty */ }
          else { result[key] = checkDiff(o1[key],o2[key]); }
        }
        else if (o1[key] !== o2[key]) { result[key] = o2[key]; }
        else { /* empty */ }
      }

      return result;
    };

    return check(o1,o2);
  }
}

module.exports = Compare;
