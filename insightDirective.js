var _ = require('underscore');

insightDirective.$inject = ['$q', 'filterFilter', 'orderByFilter'];
function insightDirective($q, filterFilter, orderByFilter){
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

		compile: function(tElement, tAttrs){
			if(tAttrs.optionTemplateUrl){
				var optionRows = tElement[0].querySelectorAll("[option-row]");

				_.forEach(optionRows, function(optionRow){
					optionRow.setAttribute("template-url", tAttrs.optionTemplateUrl);
				});
			}

			if(tAttrs.assignedOptionTemplateUrl){
				var assignedOptionRows = tElement[0].querySelectorAll("[assigned-option-row]");

				_.forEach(assignedOptionRows, function(optionRow){
					optionRow.setAttribute("template-url", tAttrs.assignedOptionTemplateUrl);
				});
			}

			return this.link;
		},

		link: function ($scope, element, attrs, ngModelCtrl) { //todo $scope -> scope
			var insight = $scope.insight;
			insight.data = insight.data || [];

			if(!insight.fieldDefs){
				throw new Error("Insight fieldDefs is required");
			}

			$scope.state = {};
			$scope.state.preview = {
				usePreview: false,
				showPreview: true
			};

			$scope.overlayData = insight.loadPage ? [] : insight.data;

			$scope.favorites = [];
			$scope.recents = insight.data ? insight.data.slice(0,8) : []; //placeholder until we have real recents

			$scope.assignedItems = [];

			if(ngModelCtrl){
				ngModelCtrl.$render = function () {
					$scope.assignedItems = [];

					_.forEach($scope.insight.data, function(item){
						item.assigned = false;
					});

					ngModelCtrl.$modelValue
						.map(function (item) {
							var existing = insight.data[findIndexByIdentifier(insight.data, item)];
							return existing || item;
						})
						.forEach(assignItem);
				};
			}

			$scope.tryLoadPage = function () {
				if (!(insight.loadPage instanceof Function)) {
					return;
				}

				var deferred = $q.defer();
				insight.loadPage($scope.insight.query, deferred);
				deferred.promise
					.then(function (data) {
						$scope.overlayData = data && data.map(function (item) {
							var existing = insight.data[findIndexByIdentifier(insight.data, item)];
							return existing ? _.extend(existing, item) : item;
						});
					});
			};

			var assignItem = $scope.assignItem = function(item){
				item.assigned = true;
				$scope.assignedItems.push(item);

				if (findIndexByIdentifier(insight.data, item) === -1) {
					insight.data.push(item);
				}
				tryUpdateModel();
			}

			var removeItem = $scope.removeItem = function(item) {
				item.assigned = false;

				var index = findIndexByIdentifier($scope.assignedItems, item);
				if (index !== -1) {
					$scope.assignedItems.splice(index,1);
					tryUpdateModel();
				}
			};

			var toggleItemAssignment = $scope.toggleItemAssignment = function(item) {
				return item.assigned ? removeItem(item) : assignItem(item);
			};

			$scope.closeOptions = function() {
				$scope.showOptions = false;
				$scope.insight.query = '';
				$scope.focus = false;
			};

			$scope.getDataType = function(item){
				return item[$scope.insight.fieldDefs.dataType];
			}

			$scope.getIconClass = function(item){
				var dataType = $scope.getDataType(item);

				var dataTypeClasses = insight.dataTypes || {};
				return dataTypeClasses[dataType] || insight.dataType;
			}

			$scope.filterOptions = function(data){
				data = data || [];
				if(!$scope.insight.loadPage){
					data = filterFilter(data, $scope.insight.query);
				}
				data = orderByFilter(data, $scope.insight.fieldDefs.display);

				return data;
			}

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

module.exports = insightDirective;
