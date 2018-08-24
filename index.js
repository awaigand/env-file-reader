var fs = require('fs');

function parseEnvFile (file, {
  exclude = [],
  delimiter = ['$', '']
} = {}) {
  var data = fs.readFileSync(file, 'utf-8');
  return parseEnvString(data, {exclude, delimiter})
}

function parseEnvString(data, {
  exclude = [],
  delimiter = ['$', '']
} = {}){
  var resultEnvMap = {};
  const EXTRACT_ENV_NAME_AND_VALUE_REGEX = /^([^= ]+)=([^\n]*)/gm;
  var results;
  while ((results = EXTRACT_ENV_NAME_AND_VALUE_REGEX.exec(data)) !== null) {
    let variableName = results[1].trim();
    let variableValue = results[2].trim();
    if (exclude.indexOf(variableName) < 0) { resultEnvMap[variableName] = variableValue; }
  }

  return recursiveReplace(resultEnvMap);

  function recursiveReplace (map) {
    var stringMap = JSON.stringify(map);
    var allEnvNames = Object.keys(map).map(i => delimiter[0] + i + delimiter[1]);

    replaceAllValuesInMap();
    while (stillHasEnvNamesToReplace()) {
      replaceAllValuesInMap();
    }
    return JSON.parse(stringMap);

    function replaceAllValuesInMap () {
      for (let key in map) {
        stringMap = stringMap.replace(delimiter[0] + key + delimiter[1], map[key]);
      }
    }

    function stillHasEnvNamesToReplace () {
      var result = false;
      for (let i = 0; i < allEnvNames.length; i++) {
        if (stringMap.indexOf(allEnvNames[i]) >= 0) {
          result = true;
          break;
        }
      }
      return result;
    }
  }
}

module.exports = {
  parse: parseEnvFile,
  parseString: parseEnvString
};
