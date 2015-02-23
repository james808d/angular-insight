angular.module('example', ['ngSanitize', 'ui.highlight', 'ui.bootstrap'])
.controller('SelectController', selectController)
.factory('GroupList', groupList);
