var ALCE = require('alce'),
    fs = require('fs'),
    path = require('path'),
    merge = require('merge-recursive'),
    env = process.env.NODE_ENV || 'development',
    colors = require('colors'),
    useColor = true,
    silent = true,
    color;

// set our color based on environment
if (env === 'development') {
    color = 'red';
} else if (env === 'test') {
    color = 'yellow';
} else if (env === 'production') {
    color = 'green';
} else {
    color = 'blue';
}

// color
function c(str, color) {
    return useColor ? str[color] : str;
}

function parse(fileName) {

    var config;

    // try to read it
    try {
        config = fs.readFileSync(fileName, 'utf-8');
    } catch (e) {
        console.error(c("No config file found for %s", 'red'), env);
        console.error(c("We couldn't find anything at: %s", 'grey'), fileName);
        config = "{}";
    }

    try {
        // use ALCE to parse to allow comments/single quotes
        config = ALCE.parse(config);
        if (config.getconfig) {
            if (config.getconfig.hasOwnProperty('colors')) useColor = config.getconfig.colors;
            if (config.getconfig.hasOwnProperty('silent')) silent = config.getconfig.silent;
        } else {
            config.getconfig = {};
        }
        config.getconfig.env = env;

    } catch (e) {
        console.error(c("Invalid JSON file", 'red'));
        console.error(c("Check it at:", 'grey') + c(" http://jsonlint.com", 'blue'));
        throw e;
    }

    return config;
}

// log out what we've got
if (!silent) console.log(c(c(env, color), 'bold') + c(' environment detected', 'grey'));

// export it
module.exports.get = function(fileName) {

    if (path.extname(fileName) !== ".json") {
        fileName += ".json";
    }

    var filePath = path.normalize(fileName),
        envFilePath = path.join(path.dirname(filePath), env, path.basename(filePath));

    var config = parse(filePath);

    if (env && envFilePath !== filePath && fs.existsSync(envFilePath)) {

        config = merge.recursive(config, parse(envFilePath));
    }

    return config;
}