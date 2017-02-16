'use strict';
var app = angular.module('recordApp');
app.service('dataServices', require('./mapping'));
app.factory('callRestFactory', require('./callRest'));
app.factory('contextPath',require('./contextPath'));
app.factory('errorMessageHandler',require('./messageHandler'));
