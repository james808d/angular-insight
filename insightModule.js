var angular = require('angular');
var fs = require('fs');
var path = require('path');

module.exports = angular
	.module('insight', ['ngSanitize', 'ui.highlight', 'ui.bootstrap'])
	.controller('InsightController', ['$scope', 'GroupList', require('./insightController')])
	.directive('optionRow', require('./insightDirective'))
	.run(['$templateCache', function($templateCache) {
		$templateCache.put('insight.html', fs.readFileSync(path.join(__dirname, 'insight.html'), 'utf8'));
		$templateCache.put('option-row.html', fs.readFileSync(path.join(__dirname, 'option-row.html'), 'utf8'));
	}])
	.name;
