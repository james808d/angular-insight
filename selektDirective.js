angular.module('selekt')

.directive('optionRow', [function() {

		return {
			transclude: true,
			templateUrl: function(tElement, tAttrs) {
				return tAttrs.templateUrl || '/bower_components/angular-select-widget/option-row.html';
			}
		}

	}]);