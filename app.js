var app = angular.module('myApp', ['ngRoute']);
      app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
        $routeProvider
                    .when('/enrollHistory/:id',
          {
                        templateUrl:'enrollHistory.html',
                        controller:'enrollCtrl'
                    })
                    .when('/',
          {
                        templateUrl:'homepage.html',
                        controller:'homeCtrl'
                    })
                     .when('/gradeHistory/:id',
                    {
                        templateUrl:'gradeHistory.html',
                        controller:'gradeCtrl'
                    }).
          otherwise({
             redirectTo:'/'
          });

          $httpProvider.defaults.useXDomain = true;
          delete $httpProvider.defaults.headers.common['X-Requested-With'];
      }]);

      app.run(['$http', function ($http) {
          var username = "authentica";
          var password = "@uth3nt1c@";
          function make_base_auth(user, password) {
                var tok = user + ':' + password;
                var hash = btoa(tok);
                return "Basic " + hash;
           }
          $http.defaults.headers.common.Authorization = make_base_auth(username, password);
          $http.defaults.headers.post["Content-Type"] = "text/plain";
     }]);

      app.controller('homeCtrl', ['$scope', 'studentService', function($scope, studentService) {
          
          studentService.getStudentData("All/").then(function(response){
             $scope.students = response;
          }, function(e){
              console.log("error");
          });
      }]);

      app.controller('gradeCtrl', ['$scope', '$routeParams','studentService', function($scope, $routeParams, studentService) {
          
          var endpoint = 'AssignmentHistory/?studentId='+ $routeParams.id 
          
             var format = function(input){
                 if(input == null){
                     return ;
                 }
                 else{
                   var time = input.split('T');
                     return time[0];  
                 }
                
            } 
             


          studentService.getStudentData(endpoint).then(function(response){
             console.log(response);
            for(var i =0; i< response.length; i++){
               response[i].completionDate =  format(response[i].completionDate);
                if(response[i].completionDate == null){
                    response[i].completionDate = "Not yet completed";
                }
               response[i].dueDate = format(response[i].dueDate);
            }
              console.log(response);
             $scope.gradeHistory =  response;
          }, function(e){
              console.log("error");
          });
      }]);

     app.controller('enrollCtrl', ['$scope', '$routeParams','studentService', function($scope, $routeParams, studentService) {
        
        var endpoint = 'EnrollmentHistory/?studentId='+ $routeParams.id 

          studentService.getStudentData(endpoint).then(function(response){
             $scope.history = response;
          }, function(e){
              console.log("error");
          });
      }]);