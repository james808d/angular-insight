var angular = require('angular');
var $ = require('jquery');
var insight = require('../insightModule');

describe('insight directive', function () {
	var insightOptions = { data: [], fieldDefs: {} };
	var scope, compile;

	beforeEach(function () {
		angular.mock.module(insight);
		angular.mock.inject(function ($rootScope, $compile) {
			scope = $rootScope.$new();
			compile = $compile;
		});
	});

	function compileAndLink (element) {
		var element = compile($(element))(scope);
		scope.insightOptions = angular.copy(insightOptions);
		scope.$apply();
		return element;
	}

	it('should compile and link', function () {
		var insightElement = '<div insight="insightOptions"></div>';
		assert.doesNotThrow(compileAndLink.bind(null, insightElement), 'compile and link do not throw');
	});
});
