module.exports = function ($http) {
	return {
		queryMovies: function (query) {
			return $http
				.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies.json', {
					params: {
						callback: 'JSON_CALLBACK',
						q: query,
						page_limit: 10,
						apikey: '9x4ypv6dgf2f5ptwn9u3k8s6'
					}
				})
				.then(function (response) {
					return response.data.movies;
				});
		}
	};
};
