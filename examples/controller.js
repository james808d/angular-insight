module.exports = function($scope, GroupList) {
	$scope.insightOptions = {
		data: GroupList.groups
	};
	$scope.selectedGroups = [GroupList.groups[1], GroupList.groups[2]];
}
