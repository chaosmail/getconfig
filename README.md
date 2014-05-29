#getconfig - config fetcher for node.js

Managing configs for different environments is kind of a pain.

In short I wanted it to:
- Organize configurations in different directories ('dev', 'test', 'production', ..)
- Automatically merge with the configuration file in the root directory
- Use `NODE_ENV` environment variable to grab appropriate config
- let me just go `var config = require('getconfig')` from anywhere in the app and have it Just Work™
- Let me write configs that are structured like JSON but:
    - allow comments
    - single quotes
    - trailing commas

## How to use

1. `npm install getconfig`
2. Create a `app.json` file
3. Just require getconfig like so from anywhere in your project:

```js
var config = require('getconfig');
var appConfig = config.get('test/config/app');
```
4. that's it!


## Where to put your config and what to call it

Just place it so that it matches the following pattern: `config.json` and `{{ environment name }}/config.json`.

If `NODE_ENV` isn't set it defaults to `dev`.

You can set name your environments whatever you want, but we color these nicely:

- `root` - app.json
- `root/dev` - app.json
- `root/test` - app.json
- `root/production` - app.json


## Comments in JSON, oh my!

getconfig uses [ALCE](https://github.com/walmartlabs/ALCE) to parse JSON files, which means you can use comments, single quotes, and unquoted keys, woohoo! But of course it works just fine on regular JSON too. It just gives you the option.


## Explicitly setting the config location

In certain circumstances, when your app isn't run directly (e.g. test runners) getconfig may not be able to lookup your config file properly. In this case, you can set a `GETCONFIG_ROOT` environment variable to directory where your configs are held.


## Other options, info

You can also tell getconfig whether you want it to log out it's environment info (as it does by default) and whether or not to use colors in output. By adding the following to your `{{some name}}_config.json` file:

```json
{
    "getconfig": {
        "colors": false, //turns off colors
    }
}
```

```json
{
    "getconfig": {
        "silent": true, //turns off all output
    }
}
```

getconfig will always fill in the `getconfig.env` value in your resulting config object with the current environment name so you can programatically determine the environment if you'd like.


## Changelog

0.4.0 - Configurations now loaded from ENV directory
0.3.0 - Switching from JSON.parse to ALCE to allow single quotes and comments. Better readme.


## License

MIT

if you dig it follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.
