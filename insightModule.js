'use strict';

var angular = require('angular');
var fs = require('fs');
var path = require('path');

module.exports = angular
	.module('insight', ['infinite-scroll', 'ngSanitize', 'ui.highlight'])
	.directive('insight', require('./insightDirective'))
	.directive('optionRow', require('./optionRowDirective'))
	.directive('assignedOptionRow', require('./assignedOptionRowDirective'))
	.value('insightStrings', require('./insightStrings'))
	.run(['$templateCache', function($templateCache) {
		$templateCache.put('insight.html', fs.readFileSync(path.join(__dirname, 'insight.html'), 'utf8'));
		$templateCache.put('option-row.html', fs.readFileSync(path.join(__dirname, 'option-row.html'), 'utf8'));
		$templateCache.put('assigned-option-row.html', fs.readFileSync(path.join(__dirname, 'assigned-option-row.html'), 'utf8'));
	}])
	.name;
