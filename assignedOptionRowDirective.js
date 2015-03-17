module.exports = function() {
	return {
		templateUrl: function(tElement, tAttrs) {
			return tAttrs.templateUrl || 'assigned-option-row.html';
		}
	}
};
