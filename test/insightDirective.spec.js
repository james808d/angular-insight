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

	it('should get item dataType', function () {
		var insightElement = '<div insight="insightOptions"></div>';
		insightOptions.data = [{id: 1}, {id: 2}]

		insightOptions.fieldDefs.dataType = function(item){
			return 'item-'+item.id;
		};

		compileAndLink(insightElement);

		var insightScope = scope.$$childHead;

		assert(insightScope.getDataType(insightOptions.data[0]) === 'item-1', 'Wrong dataType');
	});
});
