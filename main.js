var app = angular.module('contacts', [
    'ngResource',
    'infinite-scroll',
    'angularSpinner'
]);

app.config(function($httpProvider, $resourceProvider) {
    
//    $httpProvider.defaults.headers.common['Authorization'] = 'Token 5e299ae71fd699dce72de8459ea5415427170b31';
    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer sKsyA3q54CEprhp78RRiF4F8e36HvzMzumO1ctJK';
//    $resourceProvider.defaults.stripTrailingSlashes = false;
});

app.factory("Contact", function($resource) {
//    return $resource("https://codecraftpro.com/api/samples/v1/contact/:id/");
    return $resource('http://restcms.local/api/v1/contacts');
});

app.controller('PersonDetailController', function ($scope, ContactService) {
    
    $scope.contacts = ContactService;
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
        }
    };
    
    self.loadContacts();
    
    return self;
});

