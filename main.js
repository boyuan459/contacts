var app = angular.module('contacts', [
    
]);

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

app.service('ContactService', function() {
    
    return {
        'addPerson': function(person) {
            this.persons.push(person);
        },
        'selectedPerson': null,
        'persons': [
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
            "email": "Praesent@pedenec.et",
            "birthdate": "2015-03-23T18:00:37-07:00",
            "phonenumber": "07624 073918",
            "address": "5880 Sed, Street",
            "city": "Denderbelle",
            "country": "Ethiopia"
        },
        {
            "name": "Grace Huffman",
            "email": "Praesent@pednec.nt",
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
    ]
    };
});

