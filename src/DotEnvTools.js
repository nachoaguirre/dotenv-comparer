const Files = require('./Files.js');
const Compare = require('./Compare.js');

class DotEnvTools  {
    constructor({envPath='', envDistPath='', environments={}}) {
        this.envPath = envPath;
        this.envDistPath = envDistPath;
        this.environments = environments;
        this.files = new Files(envPath, envDistPath);
        this.compare = new Compare(envPath, envDistPath);
        this.files.checkFiles();
        this.parseResult = this.compare.parseAndCompareEnvs();
    }

    parseDifferences = () => {
        let differences = this.parseResult.differences;
        let result = [];
        for(let key in differences) {
            result[key] = {'env': differences[key], 'dist': this.files.getEnvDistValue(key), }
        }
        return result;
    }

    parseNews = () => {
        let news = this.parseResult.news;
        let result = [];
        for(let key in news) { result[key] = {'dist': this.files.getEnvDistValue(key)}; }
        return result;
    }

    parseEquals = () => {
        let equals = this.parseResult.equals;
        let result = [];
        for(let key in equals) { result[key] = this.files.getEnvDistValue(key); }
        return result;
    }

    parseAll() {
        return {
            'equals': this.parseEquals(),
            'differences': this.parseDifferences(),
            'news': this.parseNews(),
        }
    }

    importNewVariables() {
        let news = this.parseResult.news;
        let amount = Object.keys(news).length;
        if(amount > 0) {
          let current = 1;

          let d = new Date();
          let pad = (n) => {return n<10 ? '0'+n : n}
          let datetimeFile = `${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())} @ ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
          this.files.writeEnvValue(`### AUTO IMPORTED ON ${datetimeFile} `, ' ###');

          for(let key  in news){
            if(current <= amount) {
              this.files.writeEnvValue(key, news[key]);
              current++;
            }
          }
          this.parseResult = this.compare.parseAndCompareEnvs();
          return amount;
        } else {
            return 0;
        }
    }

    syncVariables() {
        // let news = this.parseResult.news;
        // console.log(news);

        let variables = this.parseResult.differences;
        //console.log(variables);

        let amount = Object.keys(variables).length;
        if(amount > 0) {
            let current = 1;

            let d = new Date();
            let pad = (n) => {return n<10 ? '0'+n : n}
            let datetimeFile = `${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())} @ ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

            for(let key  in variables){
                if(current <= amount) {
                    // console.log("KEY", key);
                    // console.log("variables", variables[key]);
                    // console.log("variables2", this.files.getEnvDistValue(key));
                    //this.files.writeEnvValue(key, variables[key.dist]);
                    this.files.writeEnvValue(key, this.files.getEnvDistValue(key));
                    current++;
                }
            }
            this.parseResult = this.compare.parseAndCompareEnvs();
            return amount;
        } else {
            return 0;
        }
      }

}

module.exports = DotEnvTools;