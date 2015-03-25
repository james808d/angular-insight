var _ = require('underscore');

module.exports = function($scope, GroupList, MovieService) {
	_.extend($scope, {
		basicOptions: {
			data: GroupList.groups,
			fieldDefs: {
				identifier: '_id',
				display: 'name'
			},
			dataType: 'group'
		},
		assignedGroups: [GroupList.groups[1], GroupList.groups[2]],

		pluckAssignedGroupNames: function () {
			return _.pluck($scope.assignedGroups, 'name');
		},

		movieOptions: {
			data: [{ id: '770946423', title: 'Avengers', type: 'film' }],
			fieldDefs: {
				identifier: 'id',
				display: 'title',
				dataType: 'type'
			},
			dataTypes: {
				film: 'film'
			},
			loadPage: function (query) {
				if (!query.length) {
					return
				}

				return MovieService
					.queryMovies(query)
					.then(function (movies) {
						//Set data type field on each movie object
						movies.forEach(function (movie) {
							movie.type = 'film';
						});

						return movies
					});
			}
		},
		assignedMovies: [{ id: '770946423', type: 'film' }]

	});

}
