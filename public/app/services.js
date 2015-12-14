angular.module("FlashcardServices", ["ngResource"])
.factory("Flashcard", ["$resource", function($resource) {
	return $resource("http://localhost:3000/api/flashcards/:id");
}])
.factory("Auth", ["$window", function($window) {
	return {
		saveToken: function(token) {
			$window.localStorage["secretflashcards-token"] = token;
		},
		getToken: function(token) {
			return $window.localStorage["secretflashcards-token"];
		},
		removeToken: function(token) {
			$window.localStorage.removeItem("secretflashcards-token");
		},
		isLoggedIn: function() {
			var token = this.getToken();
			return token ? true : false;
		}
	}
}])
.factory("AuthInterceptor", ["Auth", function(Auth) {
	return {
		request: function(config) {
			var token = Auth.getToken();
			if (token) {
				config.headers.Authorization = "Bearer" + token;
			}
			return config;
		}
	};
}]);