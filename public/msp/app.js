var myApp = angular.module('myApp', []);

myApp.controller('MspAppCtrl', ['$scope', '$http', function ($scope, $http) {

        var errorAlert = function (error, status) {

            console.error(error);
            console.error("status " + status);

            alert(error.error_message);

        };

        var refresh = function () {

            $scope.msp = "";

            $http.get('/api/msp/').success(function (response) {
                $scope.mspList = response;
            }).error(function (error, status) {
                errorAlert(error, status);
            });
        };

        refresh();

        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        $scope.random = function () {

            var rand_size = randomIntFromInterval(1, 8);
            var rand_va = "";
            var rand_vb = "";

            for (i = 0; i < rand_size; i++) {
                rand_va += (rand_va != "" ? " " : "") + randomIntFromInterval(-1000, 1000);
                rand_vb += (rand_vb != "" ? " " : "") + randomIntFromInterval(-1000, 1000);
            }

            $scope.msp = {
                'size': rand_size,
                'va': rand_va,
                'vb': rand_vb
            };

        };

        $scope.addMSP = function () {
                        
            if (!Array.isArray($scope.msp.va) && $scope.msp.va != undefined) {
                $scope.msp.va = $scope.msp.va.replace(",", "").split(" ");
            }

            if (!Array.isArray($scope.msp.vb) && $scope.msp.vb != undefined) {
                $scope.msp.vb = $scope.msp.vb.replace(",", "").split(" ");
            }

            console.log($scope.msp);
            $http.post('/api/msp/', $scope.msp).success(function (response) {
                console.log(response);
                refresh();
            }).error(function (error, status) {
                errorAlert(error, status);
            });
        };

        $scope.remove = function (id) {
            console.log(id);
            $http.delete('/api/msp/' + id).success(function (response) {
                refresh();
            }).error(function (error, status) {
                errorAlert(error, status);
            });
        };

        $scope.clone = function (id) {

            console.log(id);

            $http.get('/api/msp/' + id).success(function (response) {

                $scope.msp = {
                    'size': response.size,
                    'va': response.va.join(" "),
                    'vb': response.vb.join(" ")
                };

            }).error(function (error, status) {
                errorAlert(error, status);
            });
        };

        $scope.update = function () {
            console.log($scope.msp._id);
            $http.put('/api/msp/' + $scope.msp._id, $scope.msp).success(function (response) {
                refresh();
            }).error(function (error, status) {
                errorAlert(error, status);
            });
        };

        $scope.deselect = function () {
            $scope.msp = "";
        };

    }]);