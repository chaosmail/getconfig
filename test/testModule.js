var config = require('../getconfig.js');

var assert = require('assert');
var NODE_ENV = process.env.NODE_ENV || 'development';

describe('getconfig', function(){
    describe('#get()', function(){
        it('should return merged configuration from js config', function(){
            if (NODE_ENV === 'test') {

                var appConfig = config.get('test/config/app');

                assert.equal(appConfig.test, 'base-test');
                assert.equal(appConfig.testValue, 'test-value');
                assert.equal(appConfig.testOverwrite, 'test-value-overwritten');
            } else {

                var appConfig = config.get('test/config/app');

                assert.equal(appConfig.test, 'base-test');
                assert.equal(appConfig.testValue, 'development-value');
                assert.equal(appConfig.testOverwrite, 'development-value-overwritten');
            }
        })
        it('should return merged configuration from json config', function(){
            if (NODE_ENV === 'test') {

                var appConfig = config.get('test/config/app.json');

                assert.equal(appConfig.test, 'base-test');
                assert.equal(appConfig.testValue, 'test-value');
                assert.equal(appConfig.testOverwrite, 'test-value-overwritten');
            } else {

                var appConfig = config.get('test/config/app.json');

                assert.equal(appConfig.test, 'base-test');
                assert.equal(appConfig.testValue, 'development-value');
                assert.equal(appConfig.testOverwrite, 'development-value-overwritten');
            }
        })
    })
})