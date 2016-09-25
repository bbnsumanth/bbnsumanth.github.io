(function(){
  'use strict';
  //using strict will raise a error if we do some thing like this x ='hello';
  //since we are not using var x ,x will be defined in global scope
  var app = angular.module('myApp' , [])
  app.controller('myController',function($scope){
    $scope.name = "";
    $scope.total = 0;
    $scope.calculateTotal = function(){
      //get name variable and calculate total,assign it to total
      $scope.total = 0;
      var i = 0;
      while(i<($scope.name.length)){
        $scope.total = $scope.total+$scope.name.charCodeAt(0);;
        i=i+1;
      }
    }
  })
//################################### FILTER(week(2)-lec(12-13)) #########################################
  app.controller('msgController',msgController);
  msgController.$inject = ['$scope','$filter'];
  function msgController($scope, $filter){
    $scope.name = "sumanth";
    $scope.state = "hungry";

    $scope.sayMessage = function(){
      var mess = "sumanth like salads";
      //get a uppercase fiter from angular
      var uppercaseFilter = $filter('uppercase')
      //apply filter
      var output =  uppercaseFilter(mess);
      return output;
    };

    $scope.feed = function(){
      $scope.state = "fed";
    };
  }

  //registering custom filer named custom,and it factory
  app.filter('custom',customFilterFactory);
  //define the function to return custom filter
  function customFilterFactory(){
    return function(input){
      //change input
      return 'customFilter applied';
    }
  }

  app.controller('msgController1',msgController1);
  //inject a custom filter:filter_name+Filter
  msgController1.$inject = ['$scope','customFilter'];
  function msgController1($scope, customFilter){
    $scope.name = "sumanth";
    $scope.state = "hungry";
    $scope.sayMessage = function(){
      var mess = "sumanth like salads";
      var output =  customFilter(mess);
      return output;
    };

    $scope.feed = function(){
      $scope.state = "fed";
    };
  }

  //using a filter in js is nothing grt, we can always create a function and use that instead of this
  //filter,the good is that we can use filter directly in html which we can not do with js functions.
  app.filter('custom1',custom1FilterFactory);
  //define the function to return custom filter
  function custom1FilterFactory(){
    //this filter will take extra argument:arg1 along with the input on which this filter works on.
    return function(input,arg1){
      //change input
      return 'customFilter applied from html with '+ arg1 ;
    }
  }

  app.controller('msgController2',msgController1);
  //no need to inject a custom filter into controllr because we are using it directly from html.
  msgController2.$inject = ['$scope'];
  function msgController2($scope){
    $scope.name = "sumanth";
    $scope.state = "hungry";
    $scope.sayMessage = function(){
      return output ="sumanth like salads";;
    };
    $scope.feed = function(){
      $scope.state = "fed";
    };
  }
  //################################### FILTER(week(2)-lec(12-13)) #########################################
  //################################### DIGEST CYCLE (week(2)-lec()) #########################################
  //registering watcher manually on certain scope onjects
  app.controller('digestController',digestController);
  digestController.$inject = ['$scope'];
  function digestController($scope){
    $scope.onceCount = 0;
    $scope.count = 0;

    $scope.showNumberOfWatchers = function(){
      console.log('# of watchers : ',$scope.$$watchersCount,"  ", $scope.$$watchers);
    }

    $scope.countOnce = function(){
      $scope.onceCount = 1;
    }

    $scope.increment = function(){
      $scope.count++;
    }

    //we can listen for changes on a value on scope by registering a watcher manually and do some action
    $scope.$watch('onceCount',function(newValue,oldValue){
      console.log('old value:',oldValue,"  ",'new value:',newValue)
    })

    $scope.$watch('count',function(newValue,oldValue){
      console.log('old value:',oldValue,"  ",'new value:',newValue)
    })

  }

  //registering watcher indirectly using anugular
  app.controller('digestController1',digestController1);
  digestController1.$inject = ['$scope'];
  function digestController1($scope){
    $scope.onceCount = 0;
    $scope.count = 0;

    $scope.showNumberOfWatchers = function(){
      console.log('# of watchers : ',$scope.$$watchersCount,"  ", $scope.$$watchers);
    }

    $scope.countOnce = function(){
      $scope.onceCount = 1;
    }

    $scope.increment = function(){
      $scope.count =$scope.count + 2 ;
    }
    //watch is called on scope upon any action on html,it will check whether any field registered on scope through html changes
    // $scope.$watch(function(){
    //   console.log("digest loop fired in digestController1")
    // })

  }

  app.controller('digestController2',digestController2);
  digestController2.$inject = ['$scope'];
  function digestController2($scope){
    $scope.count = 0;

    $scope.increment = function(){
      setTimeout(function(){
        $scope.count++;
        console.log('incremented counter in background with out calling digest so it need a digest to see the incremented value');
      },2000);
    }

    $scope.incrementWithDigest = function(){
      setTimeout(function(){
        $scope.count++;
        console.log('incremented counter in background and called digest ');
        $scope.$digest();
      },2000);
    }

    //watch is called on scope upon any action on html,it will check whether any field registered on scope through html changes
    // $scope.$watch(function(){
    //   console.log("digest loop fired in digestController2")
    // })

  }



  //################################### DIGEST CYCLE (week(2)-lec()) #########################################






})();
