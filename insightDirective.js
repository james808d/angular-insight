angular.module('insight')

.directive('optionRow', [function() {

		return {
			transclude: true,
			templateUrl: function(tElement, tAttrs) {
				return tAttrs.templateUrl || '/bower_components/angular-insight/option-row.html';
			}
		}

	}]);