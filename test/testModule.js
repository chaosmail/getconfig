var config = require('../getconfig.js');

var assert = require('assert');
var NODE_ENV = process.env.NODE_ENV || 'dev';

describe('getconfig', function(){
    describe('#get()', function(){
        it('should return merged configuration', function(){
            if (NODE_ENV === 'test') {

                var appConfig = config.get('test/config/app');

                assert.equal(appConfig.test, 'base-test');
                assert.equal(appConfig.testValue, 'test-value');
                assert.equal(appConfig.testOverwrite, 'test-value-overwritten');
            } else {

                var appConfig = config.get('test/config/app');

                assert.equal(appConfig.test, 'base-test');
                assert.equal(appConfig.testOverwrite, 'dev-value-overwritten');
            }
        })
    })
})