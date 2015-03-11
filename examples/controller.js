var _ = require('underscore');

module.exports = function($scope, GroupList, MovieService) {
	_.extend($scope, {
		basicOptions: {
			data: GroupList.groups
		},
		assignedGroups: [GroupList.groups[1], GroupList.groups[2]],

		movieOptions: {
			data: [],
			loadPage: function (query, deferred) {
				if (!query.length) {
					return deferred.resolve();
				}

				MovieService
					.queryMovies(query)
					.then(function (movies) {
						//rename title property to name until display properties are supported
						//Call deferred.resolve with result array. Replaces results already stored by insight.
						deferred.resolve(movies
							.map(function (movie) {
								return {
									id: movie.id,
									name: movie.title
								};
							})
							.map(function (movie) {
								var existingMovie = _.findWhere($scope.movieOptions.data, movie);
								return existingMovie || movie;
							})
						);

					}, deferred.reject);
			}
		},
		assignedMovies: []
	});

}
