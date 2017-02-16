(function() {
    require('./app');
    document.addEventListener('DOMContentLoaded', onDOMLoad);
    angular.bootstrap(document, ['recordApp']);

    function onDOMLoad() {

    };

}());
