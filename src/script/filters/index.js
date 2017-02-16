var app = angular.module('recordApp');

app.filter('customCurrency', ["$filter", function ($filter) {
        return function(amount, currencySymbol){
            var currency = $filter('currency');

            if(amount < 0){
                return '$' + currency(amount, currencySymbol).replace("$","");
            }

            return currency(amount, currencySymbol);
        };
    }]);

app.filter('asteriskForHyphen',function() {
        return function(input) {
            if (input) {
                return input.replace(/\*/g, '-');

            }
        }
    });

app.filter('trusted', ['$sce', function ($sce) {
         return function(url) {
                 return $sce.trustAsResourceUrl(url);
               };
         }]);
