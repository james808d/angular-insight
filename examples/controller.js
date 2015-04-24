var _ = require('underscore');

module.exports = function($scope, $q, $timeout, GroupList, MovieService) {
	var initialAssignedMovies = ['770946423', '714976247', '770800493', '771217285', '771311818', '771313962', '770955057', '770739679', '771312513', '770783549', '771247277'];

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
			data: [],
			fieldDefs: {
				identifier: 'id',
				display: 'title',
				dataType: 'type'
			},
			dataTypes: {
				film: 'film'
			},
			loadQueryPage: function (query) {
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
			},
			onAssignedInfiniteScroll: function loadNextTenMovies () {
				var movies = [];
				var movieIds = _.chain($scope.assignedMovies)
							.filter(function (movie) { return !movie.title })
							.first(10)
							.pluck('id')
							.value();

				return movieIds
					.map(function (id) { return _.partial(getMovie, id); })
					.reduce($q.when, $q.when(true))
					.then(function () {
						return movies;
					});

				function getMovie (id) {
					return $timeout(function() {
						return MovieService
							.getMovie(id)
							.then(function (movie) {
								movie.type = 'film';
								movies.push(movie);
							});
					}, 500);
				}
			}
		},
		assignedMovies: initialAssignedMovies.map(function(id) { return { id: id }; })

	});

}
