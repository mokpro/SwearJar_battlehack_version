angular.module('starter.controllers', [])

.controller('LoginCtrl', ['$scope', '$rootScope', '$state','LoginService', function($scope, $rootScope, $state, LoginService) {
  $scope.data = {};
  //check login kanappa
  $scope.login = function() {
    $("#login-failed").hide();
    var user = LoginService.checklogin($scope.data.username, $scope.data.password);
    console.log(user);
    if(user) {
      $scope.user = user;
      $state.go('tab.home');
    } else {
      $("#login-failed").show();
    }
  };
  //sign up madri!
  $scope.signup = function() {
    LoginService.signup($scope.data.username, $scope.data.password);
  };

  $scope.setUser = function () {
    Firebase.getUserDetails()
  };
}])

.controller('QuestCtrl',['$scope', '$rootScope', '$state', 'Quests', function($scope, $rootScope, $state, Quests) {
  $scope.data = {};
  $scope.quests = Quests;
  $scope.addQuest = function() {
    console.log(JSON.stringify($scope.data));
    $scope.quests.$add($scope.data);
  };
}])

.controller('CharityCtrl', function($scope, SearchService) {
  $scope.query = {};
  $scope.results = {};
  console.log("Initial",$scope.query);
  //console.log("Hi");
  $scope.search = function() {
      console.log("!!");
      $scope.results = SearchService.search($scope.query.name)
      .then(function(response) {
        $scope.results = response;
      }, function(err){
        $scope.results.push = "No Results Found";
      });
      console.log("Received results "+ $scope.results.length);
  };

  $scope.onselect = function(name) {
    console.log("Selected " + name);
  };

})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {

});
