module.exports = function() {

	return {
		transclude: true,
		templateUrl: function(tElement, tAttrs) {
			return tAttrs.templateUrl || 'option-row.html';
		}
	}
};
