var angular = require('angular');

angular
	.module('example', [require('../insightModule')])
	.controller('ExampleController', require('./controller'))
	.factory('GroupList', require('./groupList'))
	.factory('MovieService', require('./movieService'))
