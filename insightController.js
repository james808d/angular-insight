angular.module('insight')
.controller('InsightController', ['$scope', 'GroupList', function insightController($scope, GroupList){


	// this needs integration with list directive, infinite scroll, and search

	$scope.state = {};

	var data = $scope.data = GroupList.groups;
	$scope.data.$promise.then(function(response){
		$scope.favorites = [];
		$scope.recents = [];

		$scope.favorites.push(data[3]);
		$scope.favorites.push(data[6]);
		$scope.favorites.push(data[7]);

		$scope.recents.push(data[1]);
		$scope.recents.push(data[2]);
		$scope.recents.push(data[8]);
	});


	$scope.preview = false;

	$scope.assignedItems = [];

	$scope.addOption = function(item) {

		if (!item.assigned) {
			item.assigned = true;
			item.selected = false;

			_.each($scope.assignedItems, function(group){ group.selected = false;});

			$scope.assignedItems.push(item);
		}
	};

	$scope.toggleItem = function(item) {

		$scope.showMessage = false;

		if (!item.assigned) {
			item.assigned = true;
			$scope.assignedItems.push(item);
		} else {
			$scope.removeItem(item);
		}
	};

	$scope.change = function(item){
		if(item.assigned === false) {
			$scope.showMessage = true;
			$scope.messageItem = item;
		}
	};

	$scope.selectItem = function(item){

		_.each($scope.data, function(group){ group.selected = false;});
		item.selected = true;
	};

	$scope.inputPlaceholder = 'Add groups ...';

	$scope.setPlaceholder = function(value){
		$scope.inputPlaceholder = value;
		if(value === 'Find assigned groups ...'){
			$scope.showOptions = false;
		}
	};

	$scope.selectAndToggle = function(item) {
		$scope.selection(item);
		$scope.toggleItem(item);
	};

	$scope.selection = function(item){

		if (item.selected) {
			$scope.currentSelection = item;
		} else {
			$scope.currentSelection = null;
		}
	};

	$scope.closeOptions = function() {
		$scope.showOptions = false;
		$scope.query = '';
		$scope.focus = false;
		_.each($scope.data, function(group){ group.selected = false;});
	};

	$scope.removeItem = function(group) {

		group.assigned = false;

		var found, index;

		found =  $scope.assignedItems.filter(function(obj) {
			return obj._id === group._id;
		});

		index = $scope.assignedItems.indexOf(found[0]);
		$scope.assignedItems.splice(index,1);
	};

	$scope.groupOptions = {};

	$scope.groupOptions.displayItems = [
		{id:0, field:'name', label:'name', fill:true},
		{id:1, field:'users', label:'users', type:'array-length' },
		{id:2, field:'status', label:'status' },
		{id:3, field:null, label:'tools', type:'tools', actions: [
			{label:'Edit'},
			{label: 'Delete'}
		]}
	];

	$scope.groupOptions.actions = [
		{label:'Edit', callback: GroupList.get},
		{label: 'Delete', callback: GroupList.removeGroup}
	];
}]);
