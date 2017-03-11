angular.module('myApp')
.service('studentService', ['$q', '$http', function ($q, $http) {
	var base_url = 'http://interviewapi20170221095727.azurewebsites.net/api/Student/';

    
    
    
	this.getStudentData = function(endPoint){
		var url = base_url+ endPoint;
		var deferred = $q.defer();
		$http.get(url).then(function(response){
	    	deferred.resolve(response.data);
	      }, function(e){
	      	deferred.reject(e);
	      });

		return deferred.promise;
	}
}]);