const fs = require('fs');

class Files {
  constructor(envPath, envDistPath) {
    this.envPath = envPath;
    this.envDistPath = envDistPath;
  }

  checkFiles = () => {
    if(this.envPath === '' || this.envDistPath === '') { throw new Error('Set envPath and envDistPath'); }
    if (!fs.existsSync(this.envPath)) { throw '.env path not exists'; }
    if (!fs.existsSync(this.envDistPath)) { throw '.env.dist path not exists'; }
  }

  writeEnvValue = (key, value) => {
    const envVars = fs.readFileSync(this.envPath, 'utf-8').split('\n');
    const targetLine = envVars.find((line) => line.split('=')[0] === key);
    if (targetLine !== undefined) {
        const targetLineIndex = envVars.indexOf(targetLine);
        envVars.splice(targetLineIndex, 1, `${key}=${value}`);
    }
    else { envVars.push(`${key}=${value}`); }
    fs.writeFileSync(this.envPath, envVars.join('\n'));
  };

  writeImportBanner = () => {
    let d = new Date();
    let pad = (n) => {return n<10 ? '0'+n : n}
    let datetimeFile = `${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())} @ ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    this.writeEnvValue(`### AUTO IMPORTED ON ${datetimeFile} `, ' ###');
  }

  getEnvValue = (key) => {
      const envVars = fs.readFileSync(this.envPath, 'utf-8').split('\n');
      const targetLine = envVars.find((line) => line.split('=')[0] === key);
      if (targetLine !== undefined) { return targetLine.split('=')[1]; }
      return undefined;
  };

  getEnvDistValue = (key) => {
      const envVars = fs.readFileSync(this.envDistPath, 'utf-8').split('\n');
      const targetLine = envVars.find((line) => line.split('=')[0] === key);
      if (targetLine !== undefined) { return targetLine.split('=')[1]; }
      return undefined;
  };
}

module.exports = Files;
