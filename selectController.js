function selectController($scope, GroupList){


	// this needs integration with list directive, virtual scroll, and search

	$scope.state = {};

	$scope.groups = GroupList.groups;
	$scope.preview = false;

	$scope.assignedGroups = [];

	$scope.addOption = function(item) {

		if (!item.assigned) {
			item.assigned = true;
			item.selected = false;

			_.each($scope.assignedGroups, function(group){ group.selected = false;});

			$scope.assignedGroups.push(item);
		}
	};

	$scope.toggleItem = function(item) {

		if (!item.assigned) {
			item.assigned = true;
			$scope.assignedGroups.push(item);
		} else {
			$scope.removeItem(item);
		}
	};


	$scope.selectItem = function(item){

		_.each($scope.groups, function(group){ group.selected = false;});
		item.selected = true;
	};

	$scope.inputPlaceholder = 'Add groups ...';

	$scope.setPlaceholder = function(value){
		$scope.inputPlaceholder = value;
		if(value === 'Find assigned groups ...'){
			$scope.showOptions = false;
		}
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
		_.each($scope.groups, function(group){ group.selected = false;});
	};

	$scope.removeItem = function(group) {

		group.assigned = false;

		var found, index;

		found =  $scope.assignedGroups.filter(function(obj) {
			return obj._id === group._id;
		});

		index = $scope.assignedGroups.indexOf(found[0]);
		$scope.assignedGroups.splice(index,1);
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

	$scope.inputOptions = "all";

	$scope.groupOptions.actions = [
		{label:'Edit', callback: GroupList.get},
		{label: 'Delete', callback: GroupList.removeGroup}
	];
}