var angular = require('angular');

angular
	.module('example', [require('../insightModule')])
	.factory('GroupList', require('./groupList'))
