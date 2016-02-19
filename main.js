var app = angular.module('contacts', [
    'ngResource',
    'infinite-scroll',
    'angularSpinner',
    'jcs-autoValidate',
    'angular-ladda',
    'mgcrea.ngStrap',
    'toaster', 
    'ngAnimate',
    'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
            .state('list', {
                url: "/",
                views: {
                    'main': {
                        templateUrl: 'templates/list.html',
                        controller: 'PersonListController'
                    },
                    'search': {
                        templateUrl: 'templates/searchform.html',
                        controller: 'PersonListController'
                    }
                }
                
            })
            .state('edit', {
                url: "/edit/:email",
                views: {
                    'main': {
                        templateUrl: 'templates/edit.html',
                        controller: 'PersonDetailController'
                    }
                }
                
            })
            .state('create', {
                url: "/create",
                views: {
                    'main': {
                        templateUrl: 'templates/edit.html',
                        controller: 'PersonCreateController'
                    }
                }
                
            });
           
    $urlRouterProvider.otherwise('/');
});

app.config(function($httpProvider, $resourceProvider, laddaProvider, $datepickerProvider) {
    
//    $httpProvider.defaults.headers.common['Authorization'] = 'Token 5e299ae71fd699dce72de8459ea5415427170b31';
    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer sKsyA3q54CEprhp78RRiF4F8e36HvzMzumO1ctJK';
//    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer OaDDFB1RVrznu50EM35HaG4llQrHmRRi2UxVy8pU';
//    $resourceProvider.defaults.stripTrailingSlashes = false;
    laddaProvider.setOption({
        style: 'expand-right'
    });
    
    angular.extend($datepickerProvider.defaults, {
        dateFormat: 'dd/MM/yyyy',
        startWeek: 1
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

app.directive('bySpinner', function() {
    
    return {
        'transclude': true,
        'restrict': 'AEC',
        'templateUrl': 'templates/spinner.html',
        'scope': {
            'isLoading':'=',
            'message':'@'
        }
    };
});

app.filter('defaultImage', function() {
    
    return function(input, param) {
        
        if (!input) {
            return param;
        }
        return input;
    };
});

app.controller('PersonCreateController', function($scope, $state, ContactService) {
    
    $scope.mode = "Create";
    $scope.contacts = ContactService;
    
    $scope.save = function() {
        console.log("Create contact");
        var $promise = $scope.contacts.createContact($scope.contacts.selectedPerson);
        $promise.then(function(data) {
//            console.log(data);
            $state.go("list");
        });
    };
});

app.controller('PersonDetailController', function ($scope, $stateParams, $state, ContactService) {
    
    $scope.mode = "Edit";
    $scope.contacts = ContactService;
    
    $scope.contacts.selectedPerson = $scope.contacts.getPerson($stateParams.email);
    
    $scope.save = function() {
        $scope.contacts.updateContact($scope.contacts.selectedPerson).then(function() {
            $state.go("list");
        });
    };
    
    $scope.remove = function() {
        $scope.contacts.removeContact($scope.contacts.selectedPerson).then(function() {
            $state.go("list");
        });
    };
});

app.controller('PersonListController', function ($scope, $modal, ContactService) {

    $scope.search = "";
    $scope.order = 'email';
    $scope.contacts = ContactService;
   
    $scope.showCreateModal = function() {
        $scope.contacts.selectedPerson = {};
        $scope.createModal = $modal({
            scope: $scope,
            templateUrl: 'templates/modal.create.tpl.html',
            show: true
        });
        
    };
    
    $scope.createContact = function() {
        console.log("Create contact");
        var $promise = $scope.contacts.createContact($scope.contacts.selectedPerson);
        $promise.then(function(data) {
//            console.log(data);
            $scope.createModal.hide();
        });
    };
});

app.service('ContactService', function(Contact, $rootScope, $q, toaster) {
    
    var self = {
        'getPerson': function(email) {
            console.log(email);
            for (var i=0;i<self.persons.length;i++) {
                var obj = self.persons[i];
                if (obj.email == email) {
                    return obj;
                }
            }
        },
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
        'ordering': 'name',
        'doSearch': function() {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.loadContacts();
        },
        'doOrder': function() {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
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
            var d = $q.defer();
            self.isSaving = true;
//            Contact.update(person).$promise.then(function() {
            person.$update().then(function() {
                self.isSaving = false;
                toaster.pop('success', 'Updated ' + person.name);
                d.resolve();
            });
            
            return d.promise;
        },
        'removeContact': function(person) {
            var d = $q.defer();
            self.isDeleting = true;
            person.$remove().then(function() {
                self.isDeleting = false;
                var index = self.persons.indexOf(person);
                self.persons.splice(index, 1);
                self.selectedPerson = null;
                toaster.pop('success', 'Deleted ' + person.name);
                d.resolve();
            });
            
            return d.promise;
        },
        'createContact': function(person) {
            var d = $q.defer();
            self.isSaving = true;
            Contact.save(person).$promise.then(function(data) {
                self.isSaving = false;
                self.selectedPerson = null;
                self.hasMore = true;
                self.page = 1;
                self.persons = [];
                self.loadContacts();
                toaster.pop('success', 'Created ' + person.name);
                d.resolve(data);
            });
            
            return d.promise;
        },
        'watchFilters': function() {
            $rootScope.$watch(function() {
                return self.search;
            }, function(newVal) {
                if (angular.isDefined(newVal)) {
                    self.doSearch(newVal);
                }
            });

            $rootScope.$watch(function() {
                return self.ordering;
            }, function(newVal) {
                if (angular.isDefined(newVal)) {
                    self.doOrder(newVal);
                }
            });
        }
    };
    
    self.loadContacts();
    self.watchFilters();
    
    return self;
});

