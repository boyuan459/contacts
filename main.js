var app = angular.module('contacts', [
    
]);

app.controller('PersonsController', function ($scope) {

    $scope.search = "";
    $scope.selectedPerson = null;
    $scope.order = 'email';
    
    $scope.selectPerson = function(person) {
        $scope.selectedPerson = person;
    };
    
    $scope.sensitiveSearch = function(person) {
        if ($scope.search) {
            return person.name.indexOf($scope.search) == 0 || person.email.indexOf($scope.search) == 0;
        }
        
        return true;
    };
    
    $scope.persons = [
        {
            "name": "Gregory Huffman",
            "email": "byuan@ama.com.au",
            "birthdate": "2015-03-23T18:00:37-07:00",
            "phonenumber": "07624 073918",
            "address": "5880 Sed, Street",
            "city": "Denderbelle",
            "country": "Ethiopia"
        }, 
        {
            "name": "Brian Yuan",
            "email": "Paesent@pedenec.net",
            "birthdate": "2015-03-23T18:00:37-07:00",
            "phonenumber": "07624 073918",
            "address": "5880 Sed, Street",
            "city": "Denderbelle",
            "country": "Ethiopia"
        },
        {
            "name": "Grace Huffman",
            "email": "Praesent@pedenec.net",
            "birthdate": "2015-03-23T18:00:37-07:00",
            "phonenumber": "07624 073918",
            "address": "5880 Sed, Street",
            "city": "Denderbelle",
            "country": "Ethiopia"
        },
        {
            "name": "Gregory Huffman",
            "email": "Prasent@pedenec.net",
            "birthdate": "2015-03-23T18:00:37-07:00",
            "phonenumber": "07624 073918",
            "address": "5880 Sed, Street",
            "city": "Denderbelle",
            "country": "Ethiopia"
        }, 
        {
            "name": "Brian Yuan",
            "email": "Praesent@pedenec.net",
            "birthdate": "2015-03-23T18:00:37-07:00",
            "phonenumber": "07624 073918",
            "address": "5880 Sed, Street",
            "city": "Denderbelle",
            "country": "Ethiopia"
        },
        {
            "name": "Grace Huffman",
            "email": "Praesent@pednec.net",
            "birthdate": "2015-03-23T18:00:37-07:00",
            "phonenumber": "07624 073918",
            "address": "5880 Sed, Street",
            "city": "Denderbelle",
            "country": "Ethiopia"
        },
        {
            "name": "Gregory Huffman",
            "email": "Praesent@pednec.net",
            "birthdate": "2015-03-23T18:00:37-07:00",
            "phonenumber": "07624 073918",
            "address": "5880 Sed, Street",
            "city": "Denderbelle",
            "country": "Ethiopia"
        }, 
        {
            "name": "Brian Yuan",
            "email": "Praesent@pedenec.ne",
            "birthdate": "2015-03-23T18:00:37-07:00",
            "phonenumber": "07624 073918",
            "address": "5880 Sed, Street",
            "city": "Denderbelle",
            "country": "Ethiopia"
        },
        {
            "name": "Grace Huffman",
            "email": "Praesen@pedenec.net",
            "birthdate": "2015-03-23T18:00:37-07:00",
            "phonenumber": "07624 073918",
            "address": "5880 Sed, Street",
            "city": "Denderbelle",
            "country": "Ethiopia"
        }
    ];
    
});
