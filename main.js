var app = angular.module('minmax', []);

app.controller('MinMaxCtrl', function($scope, $http) {
    
    $scope.formModel = {};
    
    $scope.onSubmit = function(valid) {
        
        if (valid) {
            console.log("Hey I'm submitted");
            console.log($scope.formModel);

            $http.post('http://restcms.local/api/v1/auth/register', $scope.formModel)
                    .success(function(data) {
                        console.log(":) ", data);
                    }).error(function(err) {
                        console.log("Register error: " + err);
                    });
        } else {
            console.log("Invalid form");
        }
    };
    
});
