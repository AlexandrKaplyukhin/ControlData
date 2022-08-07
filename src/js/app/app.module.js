angular
  .module("app", ["templates"])
  .directive("app", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/app.tpl.html",
    };
  })
  .directive("contentView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/content-view.tpl.html",
      controller: ["$scope", "$rootScope", MyController],
    };
    function MyController($scope, $rootScope) {
      $scope.idNum = makeDataId();
      $scope.messages = makeDefaulData();
      $rootScope.result = $scope.messages.map((item) => item.tags);
      $scope.dateWithTime = "MM.dd.yyyy HH:MM";
      $rootScope.sortTitle = $scope.messages.slice().sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      $rootScope.el = null;
      $scope.data = {
        singleSelect: null,
      };
      $scope.changeSort = function () {
        if ($scope.data.singleSelect == "selectTitle") {
          $scope.propertyName = "title";
        } else if ($scope.data.singleSelect == "selectDate")
          $scope.propertyName = "date";
      };
      $scope.changeView = function () {
        if ($scope.valueData == true) {
          $scope.dateWithTime = "MM.dd.yyyy";
        } else {
          $scope.dateWithTime = "MM.dd.yyyy HH:MM";
        }
      };
      $scope.addItem = function () {
        $scope.messages.push({
          id: $scope.idNum,
          title: $scope.nameItem,
          tags: [],
          date: new Date().toISOString(),
        });
        $rootScope.sortTitle = $scope.messages.slice().sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
      };
      $scope.abouteTitle = function (message) {
        $rootScope.el = message;
      };
    }
  })
  .directive("sidebarView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/sidebar-view.tpl.html",
      controller: ["$scope", "$rootScope", SidebarController],
    };
    function SidebarController($scope, $rootScope) {
      $rootScope.resultTags = [].concat.apply([], $rootScope.result);

      $rootScope.$watch("el", function () {
        $scope.aboutTitle = $rootScope.el;
      });

      $scope.addTag = function () {
        $scope.aboutTitle.tags.push($scope.nameTag);
        $rootScope.resultTags = [].concat.apply([], $rootScope.result);
      };

      $scope.deleteTag = function () {
        $scope.aboutTitle.tags.pop();
        $rootScope.resultTags = [].concat.apply([], $rootScope.result);
      };
    }
  })
  .directive("elementsView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/elements-view.tpl.html",
      controller: ["$scope", "$element", elementsViewCtrl],
    };
    function elementsViewCtrl($scope, $element) {
      $scope.model = {
        width: 300,
      };
      $scope.setWidth = () => {
        let width = $scope.model.width;
        if (!width) {
          width = 1;
          $scope.model.width = width;
        }
        $element.css("width", `${width}px`);
      };
      $scope.setWidth();
    }
  })
  .directive("some1", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<some-2></some-2>",
    };
  })
  .directive("some2", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<some-3></some-3>",
    };
  })
  .directive("some3", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<summary-view></summary-view>",
    };
  })
  .directive("summaryView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/summary-view.tpl.html",
      controller: ["$scope", "$rootScope", summaryViewCtrl],
    };
    function summaryViewCtrl($scope, $rootScope) {
      $scope.amountTags = [...new Set($rootScope.resultTags)];

      $rootScope.$watch("sortTitle", function () {
        $scope.lastDate = $rootScope.sortTitle;
      });
      $rootScope.$watch("resultTags", function () {
        $scope.amountTags = [...new Set($rootScope.resultTags)];
      });
    }
  });
