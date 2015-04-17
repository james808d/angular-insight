'use strict';

var _ = require('underscore');

// @ngInject
module.exports = function insightDirective ($q, filterFilter, orderByFilter, insightStrings) {
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
			insight.strings = _.extend({}, insightStrings, insight.strings);

			if(!insight.fieldDefs){
				throw new Error("Insight fieldDefs is required");
			}

			$scope.state = {};
			$scope.state.noResults = false;
			$scope.state.preview = {
				usePreview: false,
				showPreview: true
			};

			$scope.favorites = [];
			$scope.recents = insight.data ? insight.data.slice(0,8) : []; //placeholder until we have real recents

			$scope.assignedItems = [];

			if(ngModelCtrl){
				ngModelCtrl.$render = function () {
					$scope.assignedItems = [];

					_.forEach($scope.insight.data, function(item){
						item.assigned = false;
					});

					if(ngModelCtrl.$modelValue && ngModelCtrl.$modelValue.map){
						ngModelCtrl.$modelValue
							.map(function (item) {
								var existing = insight.data[findIndexByIdentifier(insight.data, item)];
								return existing || item;
							})
							.forEach(assignItem);
					}
				};
			}

			$scope.updateOptions = function (){
				if(_.isFunction(insight.loadPage)){
					loadPage()
						.then(function(options){
							$scope.filteredOptions = filterOptions(options);
						});
				} else {
					$scope.filteredOptions = filterOptions(insight.data);
					$scope.filteredOptions.length ? $scope.state.noResults = false : $scope.state.noResults = true;
				}
			};

			$scope.preventEnter = function ($event) {
				if ($event.keyCode === 13) {
					$event.preventDefault();
				}
			};

			function loadPage(){

				$scope.state.noResults = false;

				return $q.when(insight.loadPage($scope.insight.query || ''))
					.then(function (data) {

						$scope.state.noResults = (!data || !data.length) && $scope.insight.query;

						return data && data.map(function (item) {
							var existing = insight.data[findIndexByIdentifier(insight.data, item)];
							return existing ? _.extend(existing, item) : item;
						});
					});
			}

			var assignItem = $scope.assignItem = function(item){
				item.assigned = true;
				$scope.assignedItems.push(item);

				if (findIndexByIdentifier(insight.data, item) === -1) {
					insight.data.push(item);
				}
				tryUpdateModel();
			};

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

			$scope.openOptions = function(){
				$scope.showOptions = true;
			};

			$scope.closeOptions = function() {
				$scope.showOptions = false;
				$scope.insight.query = '';
				$scope.focus = false;
			};

			$scope.getDataType = function(item){
				var fieldDef = $scope.insight.fieldDefs.dataType;
				if(_.isFunction(fieldDef)){
					return fieldDef(item);
				}
				return item[fieldDef];
			};

			$scope.getIconClass = function(item){
				var dataType = $scope.getDataType(item);

				var dataTypeClasses = insight.dataTypes || {};
				return dataTypeClasses[dataType] || insight.dataType;
			};

			var filterOptions = $scope.filterOptions = function(data){
				data = data || [];
				if(!insight.loadPage){
					data = filterFilter(data, $scope.insight.query);
				}
				data = orderByFilter(data, $scope.insight.fieldDefs.display);

				return data;
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

