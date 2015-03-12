var _ = require('underscore');

module.exports = function($scope, GroupList, MovieService) {
	_.extend($scope, {
		basicOptions: {
			data: GroupList.groups,
			fieldDefs: {
				identifier: '_id',
				display: 'name'
			}
		},
		assignedGroups: [GroupList.groups[1], GroupList.groups[2]],

		movieOptions: {
			data: [],
			fieldDefs: {
				identifier: 'id',
				display: 'title'
			},
			loadPage: function (query, deferred) {
				if (!query.length) {
					return deferred.resolve();
				}

				MovieService
					.queryMovies(query)
					.then(function (movies) {
						deferred.resolve(movies);
					}, deferred.reject);
			}
		},
		assignedMovies: []
	});

}
