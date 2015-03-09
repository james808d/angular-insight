module.exports = function insightDirective () {
	return {
		restrict: 'A',
		templateUrl: function(elem, attr) {
			return attr.templateUrl || 'insight.html';
		},
		scope: {
			insight: '='
		},
		replace: true,
		controller: ['$scope', insightController],
		compile: function () {
		}
	};
};

function insightController($scope){

	// this needs integration with list directive, infinite scroll, and search

	$scope.state = {};
	$scope.state.preview = {
		usePreview: false,
		showPreview: true
	};

	$scope.allowEditAccess = $scope.insight.allowEditAccess;

	var data = $scope.insight.data;
	$scope.favorites = [];
	$scope.recents = [];

	$scope.favorites.push(data[3]);
	$scope.favorites.push(data[6]);
	$scope.favorites.push(data[7]);

	$scope.recents.push(data[1]);
	$scope.recents.push(data[2]);
	$scope.recents.push(data[8]);



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

		if (!item.assigned) {
			$scope.showMessage = false;
			$scope.currentSelection = item;
			item.assigned = true;
			$scope.assignedItems.push(item);
		} else {

			$scope.removeItem(item);
		}
	};

	$scope.change = function(item){

		$scope.currentSelection = item;

		if(item.assigned === false) {
			$scope.showMessage = true;
			$scope.messageItem = item;
		} else {
			$scope.showMessage = false;
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

		$scope.showMessage = null;

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
		$scope.currentSelection.selected = true;
	};

	$scope.removeItem = function(group) {
		group.selected = false;
		group.assigned = false;
		$scope.showMessage = true;
		$scope.messageItem = group;

		var found, index;

		found =  $scope.assignedItems.filter(function(obj) {
			return obj._id === group._id;
		});

		index = $scope.assignedItems.indexOf(found[0]);
		$scope.assignedItems.splice(index,1);
	};
}
