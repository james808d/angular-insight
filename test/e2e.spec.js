var chai = require('chai');
var assert = chai.assert;

describe('angular insight', function () {
	describe('within a form', function () {
		it('should not submit the form on an enter keypress', function () {
			browser.get('http:///localhost:9966/examples');

			element(by.model('insight.query')).sendKeys(protractor.Key.ENTER);

			element(by.id('example-form'))
				.evaluate('exampleForm.$submitted')
				.then(function (submitted) {
					assert.notOk(submitted, 'form should not be submitted');
				});
		});
	});
})
