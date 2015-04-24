var APIKEY = '9x4ypv6dgf2f5ptwn9u3k8s6';

module.exports = function ($http) {
	return {
		queryMovies: function (query) {
			return $http
				.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies.json', {
					params: {
						callback: 'JSON_CALLBACK',
						q: query,
						page_limit: 10,
						apikey: APIKEY
					}
				})
				.then(function (response) {
					return response.data.movies;
				});
		},
		getMovie: function (id) {
			return $http
				.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies/' + id + '.json', {
					params: {
						callback: 'JSON_CALLBACK',
						apikey: APIKEY
					}
				})
				.then(function (response) {
					response.data.id = id.toString();
					return response.data;
				});
		}
	};
};
