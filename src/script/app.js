'use strict';
//PRUEBA BRANCH

var app = angular.module("recordApp", ['AngularPrint','ui.router', 'ui.bootstrap', 'ngTable', 'ngPasswordStrength', 'angular-loading-bar', 'ncy-angular-breadcrumb', 'xeditable', 'dndLists']);
require('./services');
require('./filters');
require('./directives');
require('./controllers');
//require('./recovery');

app.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      prefixStateName: 'indexPrivado'
    });
  })

//PARA AUMENTAR EL TIMEOUT
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('timeoutHttpIntercept');
}]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/indexPrivado");

  $stateProvider
  .state('indexPrivado', {
    url: "/indexPrivado",
    templateUrl: "views/misContratos.html",
    controller: "miscontratosCTRL",
    ncyBreadcrumb: {
      label: 'Inicio'
    }
  })
    .state('capitales', {
      url: "/capitales",
      templateUrl: "views/capitales.html",
      controller: "capitalesCtrl",
      ncyBreadcrumb: {
        label: 'Inversiones / Capitales'
      }
    }).state('noticias', {
    	url: '/noticias',
    	templateUrl: 'views/noticias.html',
    	ncyBreadcrumb: {
    	label: 'NOTICIAS'
    	}
    	})
    .state('fondosdeInversion', {
      url: "/fondosdeInversion",
      templateUrl: "views/fondosdeInversion.html",
      controller: "fondosdeInversionCtrl",
      ncyBreadcrumb: {
        label: 'Inversiones / Fondos de Inversión'
      }
    })
    .state('ideasdeInversion', {
      url: "/ideasdeInversion",
      templateUrl: "views/ideasdeInversion.html",
      controller: "ideasdeInversionCtrl",
      ncyBreadcrumb: {
        label: 'Ideas de Inversión'
      }
    })
    .state('mercadodeDinero', {
      url: "/mercadodeDinero",
      templateUrl: "views/mercadodeDinero.html",
      controller: "mercadodeDineroCtrl",
      ncyBreadcrumb: {
        label: 'Inversiones / Mercado de Dinero'
      }
    })
    .state('portafolio', {
      url: "/portafolio",
      templateUrl: "views/portafolio.html",
      controller: "portafolioCtrl",
      ncyBreadcrumb: {
        label: 'Portafolio'
      }
    })
    .state('transferencias', {
      url: "/transferencias",
      templateUrl: "views/transferencias.html",
      controller: "transferenciasCtrl",
      ncyBreadcrumb: {
        label: 'Transferencias'
      }
    })
    .state('enrolamiento', {
      url: "/enrolamiento",
      templateUrl: "views/enrolamiento.html",
      controller: "enrolamientoCtrl",
      ncyBreadcrumb: {
        label: 'Enrolamiento'
      }
    })
    .state('configuracion', {
      url: "/configuracion",
      templateUrl: "views/configuracion.html",
      controller: "configuracionCtrl",
      ncyBreadcrumb: {
        label: 'Configuración'
      }
    })
    .state('cambioPass', {
      url: "/cambioPass",
      templateUrl: "views/cambioPass.html",
      controller: "cambioPassCtrl",
      ncyBreadcrumb: {
        label: 'Cambio de Contraseña'
      }
    })
    .state('recoveryPass', {
      url: "/recoveryPass",
      templateUrl: "recovery/recoveryPass.html",
      controller: "recoveryPassCtrl",
      ncyBreadcrumb: {
        label: 'Recuperación de Contraseña'
      }
    })
    .state('recoveryPassTwo', {
      url: "/stepTwo",
      templateUrl: "recovery/stepTwo.html",
      controller: "stepTwoCtrl",
      ncyBreadcrumb: {
        label: 'Recuperación de Contraseña'
      }
    })
    .state('login', {
      url: "/login",
      templateUrl: "login.html",
      controller: "loginCtrl",
      })
    .state('retiro', {
      url: "/retiro",
      templateUrl: "views/retiro.html",
      controller: "retiroCtrl",
      ncyBreadcrumb: {
        label: 'Retiro'
      }
      })
    .state('impresionEstrategias', {
      url: "/",
      templateUrl: "impresionEstrategias.html",
      controller: "impresionEstrategiasCtrl"
      })
    .state('portafolio banco', {
      url: "/portafolioB",
      templateUrl: "views/portafolioB.html",
      controller: "portafolioBCtrl",
      ncyBreadcrumb: {
        label: 'Portafolio'
      }
      })
      .state('panorama', {
        url: "/panorama",
        templateUrl: "views/panorama.html",
        controller: "panoramaCtrl",
        ncyBreadcrumb: {
          label: 'Panorama'
        }
        })
});


app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
})


app.filter('reverse', function () {
            return function (items) {
              //setTimeout(function (){return items.slice().reverse()},2000);
              if(items != undefined)
                return items.slice().reverse();
            };
        });
//PARA AUMENTAR EL TIMEOUT
app.factory('timeoutHttpIntercept', function ($rootScope, $q) {
    return {
      'request': function(config) {
        config.timeout = 60000;
        return config;
      }
    };
 });

app.factory('showMessageError',
    function () {
        var flagShowMessage = false;
        var finalMessage;
        return{
            responseMessage: function (messages) {
                for (var i = 0; i < messages.length; i++) {
                    flagShowMessage = false;
                    if (messages[i].responseType === 'N') {
                        if (messages[i].ResponseCategor != 'INFO' || messages[i].ResponseCategor != 'WARN' || messages[i].ResponseCategor != 'EXITO') {
                            if (messages[i].responseMessage.indexOf("Success") === -1 && messages[i].responseMessage.indexOf("OK") === -1 && messages[i].responseMessage.indexOf("EXITO") === -1 && messages[i].responseMessage.indexOf("Exito") === -1 && messages[i].responseMessage.indexOf("true") === -1 && messages[i].responseMessage.indexOf("TRUE") === -1) {
                                finalMessage = messages[i].responseMessage;
                                flagShowMessage = true;
                                break;
                            }
                        }
                    }
                }
                if (!flagShowMessage) {
                    finalMessage = 'Error del Sistema';
                }

                return finalMessage;
            }
        };
    });
