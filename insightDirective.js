var _ = require('underscore');

module.exports = function insightDirective ($q) {
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
			var insight = $scope.insight;

			$scope.state = {};
			$scope.state.preview = {
				usePreview: false,
				showPreview: true
			};

			$scope.overlayData = insight.loadPage ? [] : insight.data;

			$scope.favorites = [];
			$scope.recents = insight.data ? insight.data.slice(0,8) : []; //placeholder until we have real recents
			$scope.assignedItems = [];

			if (ngModelCtrl) {
				ngModelCtrl.$render = function () {
					ngModelCtrl.$modelValue
							.map(function (item) {
								var existing = insight.data[findIndexByIdentifier(insight.data, item)];
								return existing || item;
							})
							.forEach(toggleItem);
				};
			}

			$scope.tryLoadPage = function () {
				if (!(insight.loadPage instanceof Function)) {
					return;
				}

				var deferred = $q.defer();
				insight.loadPage($scope.query[insight.fieldDefs.display], deferred);
				deferred.promise
					.then(function (data) {
						$scope.overlayData = data
							.map(function (item) {
								var existing = insight.data[findIndexByIdentifier(insight.data, item)];
								return existing ? _.extend(existing, item) : item;
							});
					});
			};

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

					if (findIndexByIdentifier(insight.data, item) === -1) {
						insight.data.push(item);
					}
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

			$scope.checkAssignedState = function(item) {
				if(!item.assigned) {
					toggleItem(item);
				}
			};

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

			$scope.removeItem = function(item) {
				item.selected = false;
				item.assigned = false;
				$scope.showMessage = true;
				$scope.messageItem = item;

				var index = findIndexByIdentifier($scope.assignedItems, item);
				if (index !== -1) {
					$scope.assignedItems.splice(index,1);
					tryUpdateModel();
				}
			};

			function tryUpdateModel() {
				if (!ngModelCtrl) {
					return;
				}

				ngModelCtrl.$setViewValue($scope.assignedItems);
			}

			function findIndexByIdentifier (array, item) {
				var properties = {};
				properties[insight.fieldDefs.identifier] = item[insight.fieldDefs.identifier];
				return _.findIndex(array, properties);
			}
		}
	}
};
