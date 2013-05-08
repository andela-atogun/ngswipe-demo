'use strict';

angular.module('ngswipeDemoApp')
  .controller('ArticleDetailCtrl', ['$scope', '$http', '$sanitize', '$window', 'Articles', 'FeedManager', '$location', function ($scope, $http, $sanitize, $window, Articles, FeedManager, $location) {
    $scope.bootstrap = function () {
      var feed = FeedManager.getSelected();

      $scope.pages = [];
      $scope.feed = { title: "Loading..." };
      
      Articles.fetch($window.encodeURIComponent(feed.href))
        .then(function (feed) {
          $scope.pages = feed.entries;

          for (var i = 0; i < feed.entries.length; i++) {
            console.log('checking path', $location.path(), feed.entries[i].id);
            if ($location.path().indexOf(feed.entries[i].id) > -1) {
              console.log('match!');
              $scope.pages = $scope.pages.concat($scope.pages.splice(0, i));
              $scope.pageIndex = i;
            }
          }

          $scope.feed = {
            url: feed.meta.href,
            title: feed.meta.title
          };
        });
    };
    
    $scope.bootstrap();
  }]);
