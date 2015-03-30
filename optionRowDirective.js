'use strict';

module.exports = function() {
	return {
		templateUrl: function(tElement, tAttrs) {
			return tAttrs.templateUrl || 'option-row.html';
		}
	}
};
