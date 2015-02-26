var angular = require('angular');
var fs = require('fs');
var path = require('path');

angular.module('example', ['insight'])
.factory('GroupList', require('./groupList'))
.run(function($templateCache) {
  $templateCache.put('select.html', fs.readFileSync(path.join(__dirname, '../select.html'), 'utf8'));
  $templateCache.put('option-row.html', fs.readFileSync(path.join(__dirname, '../option-row.html'), 'utf8'));
});
