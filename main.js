var app = angular.module('contacts', [
    'ngResource'
]);

app.config(function($httpProvider, $resourceProvider) {
    
    $httpProvider.defaults.headers.common['Authorization'] = 'Token 5e299ae71fd699dce72de8459ea5415427170b31';
    $resourceProvider.defaults.stripTrailingSlashes = false;
});

app.factory("Contact", function($resource) {
    return $resource("https://codecraftpro.com/api/samples/v1/contact/:id/");
});

app.controller('PersonDetailController', function ($scope, ContactService) {
    
    $scope.contacts = ContactService;
});

app.controller('PersonListController', function ($scope, ContactService) {

    $scope.search = "";
    $scope.order = 'email';
    $scope.contacts = ContactService;
    
    $scope.sensitiveSearch = function(person) {
        if ($scope.search) {
            return person.name.indexOf($scope.search) == 0 || person.email.indexOf($scope.search) == 0;
        }
        
        return true;
    };
   
});

app.service('ContactService', function(Contact) {
    
    Contact.get(function(data) {
        console.log(data);
    });
    
    return {
        'addPerson': function(person) {
            this.persons.push(person);
        },
        'selectedPerson': null,
        'persons': []
    };
});

