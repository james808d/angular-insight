var angular = require('angular');
var $ = require('jquery');
var insight = require('../insightModule');

describe('insight directive', function () {
	var insightOptions = { data: [], fieldDefs: {} };
	var scope, compile, linkElement, insightScope;

	beforeEach(function () {
		angular.mock.module(insight);
		angular.mock.inject(function ($rootScope, $compile) {
			scope = $rootScope.$new();
			compile = $compile;
		});
	});

	function compileAndLink() {
		var html = '<div insight="insightOptions"></div>';
		var element = compile($(html))(scope);
		scope.insightOptions = insightOptions;
		scope.$apply();

		insightScope = scope.$$childHead;

		return linkElement = element;
	}

	it('should compile and link', function () {
		assert.doesNotThrow(compileAndLink, 'compile and link do not throw');
	});


	it('should get item dataType', function () {
		insightOptions.data = [{id: 1}, {id: 2}]
		insightOptions.fieldDefs.dataType = function(item){
			return 'item-'+item.id;
		};

		compileAndLink();

		assert(insightScope.getDataType(insightOptions.data[0]) === 'item-1', 'Wrong dataType');
	});

	it('Should use default strings', function(){
		compileAndLink();
		assert(linkElement[0].querySelectorAll('button')[1].innerText.trim() === 'Done', 'Default string not found');
	});

	it('Should use tranlated strings', function(){
		var done = insightOptions.strings.done = "pItlh";
		compileAndLink();
		assert(linkElement[0].querySelectorAll('button')[1].innerText.trim() === done, 'Translated string not found');
	});

});
