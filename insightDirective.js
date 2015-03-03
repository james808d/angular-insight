module.exports = function insightDirective () {
	return {
		restrict: 'A',
		require: '?ngModel',
		templateUrl: function(elem, attr) {
			return attr.templateUrl || 'insight.html';
		},
		scope: {
			insight: '='
		},
		replace: true,
		link: function ($scope, element, attrs, ngModelCtrl) { //todo $scope -> scope

			// this needs integration with list directive, infinite scroll, and search

			$scope.state = {};
			$scope.state.preview = 1;

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
			if (ngModelCtrl) {
				ngModelCtrl.$render = function () {
					_.each(ngModelCtrl.$modelValue, toggleItem);
				};
			}

			$scope.addOption = function(item) {

				if (!item.assigned) {
					item.assigned = true;
					item.selected = false;

					_.each($scope.assignedItems, function(group){ group.selected = false;});

					$scope.assignedItems.push(item);
					tryUpdateModel();
				}
			};

			var toggleItem = $scope.toggleItem = function(item) {

				if (!item.assigned) {
					$scope.showMessage = false;
					$scope.currentSelection = item;
					item.assigned = true;
					$scope.assignedItems.push(item);
					tryUpdateModel();
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
				// _.each($scope.data, function(group){ group.selected = false;});
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
				tryUpdateModel();
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

			function tryUpdateModel() {
				if (!ngModelCtrl) {
					return;
				}

				ngModelCtrl.$setViewValue($scope.assignedItems);
			}
		}
	};

}
