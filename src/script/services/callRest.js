'use strict';
var callRest = ["$q", "$http", function($q, $http) {
    return {
        get: get,
        post: post
    };

    /*function get(url) {
        var defered = $q.defer();
        $http.get(url).success(function(data) {
            defered.resolve(data);
        }).error(function(err) {
            defered.reject(err);
        });
        return defered.promise;
    };*/

    function get(url) {
        var defered = $q.defer();
        $http({
            url: url,
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'authorization': sessionStorage.getItem("authorization")
            }
        }).success(function(data) {
            defered.resolve(data);
        }).error(function(err) {
            defered.reject(err);
        });
        return defered.promise;
    }

    function post(url, params) {
        var defered = $q.defer();
        $.ajax({
            url: sessionStorage.getItem('basePathBR') + "/eactinver/validate",
            method: "GET",
            async: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('authorization', sessionStorage.getItem("authorization"));
            }
        }).done(function (data, textStatus, xhr) {
            //console.log("######## VALIDATE GET CORRECTO #####");
            //console.log("operationToken-BursanetRestful: " + xhr.getResponseHeader("X-CSRF-TOKEN"));
            sessionStorage.setItem("operationToken-BursanetRestful", xhr.getResponseHeader("X-CSRF-TOKEN"));
            $http({
                url: url,
                method: "POST",
                data: $.param(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-CSRF-TOKEN': sessionStorage.getItem("operationToken-BursanetRestful"),//solo post
                    'authorization': sessionStorage.getItem("authorization")
                }
            }).success(function(data) {
                defered.resolve(data);
            }).error(function(err) {
                defered.reject(err);
            });
        }).fail(function (data, textStatus, xhr) {
            console.log("failure Validate POST");
            //console.log("operationToken-BursanetRestful: " + xhr.getResponseHeader("X-CSRF-TOKEN"));
            //sessionStorage.setItem("operationToken-BursanetRestful", xhr.getResponseHeader("X-CSRF-TOKEN"));
        });
        return defered.promise;
    };
}];
module.exports = callRest;
