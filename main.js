var app = angular.module('contacts', [
    'ngResource',
    'infinite-scroll',
    'angularSpinner',
    'jcs-autoValidate',
    'angular-ladda'
]);

app.config(function($httpProvider, $resourceProvider, laddaProvider) {
    
//    $httpProvider.defaults.headers.common['Authorization'] = 'Token 5e299ae71fd699dce72de8459ea5415427170b31';
    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer sKsyA3q54CEprhp78RRiF4F8e36HvzMzumO1ctJK';
//    $resourceProvider.defaults.stripTrailingSlashes = false;
    laddaProvider.setOption({
        style: 'expand-right'
    });
});

app.factory("Contact", function($resource) {
//    return $resource("https://codecraftpro.com/api/samples/v1/contact/:id/");
    return $resource('http://restcms.local/api/v1/contact/:id/', {id:'@id'}, {
        update: {
            method: 'PUT'
        }
    });
});

app.controller('PersonDetailController', function ($scope, ContactService) {
    
    $scope.contacts = ContactService;
    
    $scope.save = function() {
        $scope.contacts.updateContact($scope.contacts.selectedPerson);
    };
    
    $scope.remove = function() {
        $scope.contacts.removeContact($scope.contacts.selectedPerson);
    };
});

app.controller('PersonListController', function ($scope, ContactService) {

    $scope.search = "";
    $scope.order = 'email';
    $scope.contacts = ContactService;
   
    $scope.$watch('search', function(newVal, oldVal) {
        if (angular.isDefined(newVal)) {
            $scope.contacts.doSearch(newVal);
        }
    });
    
    $scope.$watch('order', function(newVal, oldVal) {
        if (angular.isDefined(newVal)) {
            $scope.contacts.doOrder(newVal);
        }
    });
});

app.service('ContactService', function(Contact) {
    
    var self = {
        'addPerson': function(person) {
            this.persons.push(person);
        },
        'page': 1,
        'hasMore': true,
        'isLoading': false,
        'isSaving': false,
        'isDeleting': false,
        'selectedPerson': null,
        'persons': [],
        'search': null,
        'doSearch': function(search) {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.search = search;
            self.loadContacts();
        },
        'doOrder': function(order) {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.ordering = order;
            self.loadContacts();
        },
        'loadContacts': function() {
            if (self.hasMore && !self.isLoading) {
                self.isLoading = true;
                
                var params = {
                    'page': self.page,
                    'search': self.search,
                    'ordering': self.ordering
                };
                
                Contact.get(params, function(result) {
                    console.log(result);
                    angular.forEach(result.data, function(person) {
                        self.persons.push(new Contact(person));
                    });
                    if (result.current_page >= result.last_page) {
                        self.hasMore = false;
                    }
                    
                    self.isLoading = false;
                });
            }
        },
        'loadMore': function() {
            if (self.isLoading) return;
            if (self.hasMore && !self.isLoading) {
                self.page += 1;
                self.loadContacts();
            }
        },
        'updateContact': function(person) {
            self.isSaving = true;
//            Contact.update(person).$promise.then(function() {
            person.$update().then(function() {
                self.isSaving = false;
            });
        },
        'removeContact': function(person) {
            self.isDeleting = true;
            person.$remove().then(function() {
                self.isDeleting = false;
                var index = self.persons.indexOf(person);
                self.persons.splice(index, 1);
                self.selectedPerson = null;
            });
        }
    };
    
    self.loadContacts();
    
    return self;
});

