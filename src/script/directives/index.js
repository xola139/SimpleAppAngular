'use strict';
var app = angular.module('recordApp');

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});



/*app.directive("theNews", function($rootScope) {
    return {
         scope: {
                    "theNews": "=data",
                    "paramreturn": "=",

                },
        template : '<div class="col-md-3 news-comun">\n\
                    <div class="container-module news-container">\n\
                      <div class="content-list-news">\n\
                        
                        {{theNews}}\n\
                      </div>\n\
                    </div>\n\
                  </div>',
    link: function ($scope, elem, attrs,modelCtrl,dataServices, callRestFactory, showMessageError) {
            

        }
    };
});*/


app.directive("formatGroupByFour", function ($http) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined)
                    return '';
                var transformedInput = inputValue.replace(/(\d{4})(?=(\d{4})+(?!\d))/g, "$1 " );
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };

});

app.directive('ngMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function (value) {
                var min = scope.$eval(attr.ngMin) || 0;
                if (!isEmpty(value) && value < min) {
                    ctrl.$setValidity('ngMin', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }
            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
});

function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}

app.directive('ngMax', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function (value) {
                var max = scope.$eval(attr.ngMax) || Infinity;
                if (!isEmpty(value) && value > max) {
                    ctrl.$setValidity('ngMax', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMax', true);
                    return value;
                }
            };

            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
});

app.directive('fixedHeader', fixedHeader);

    fixedHeader.$inject = ['$timeout'];

    function fixedHeader($timeout) {
        return {
            restrict: 'A',
            link: link
        };

        function link($scope, $elem, $attrs, $ctrl) {
            var elem = $elem[0];

            // wait for data to load and then transform the table
            $scope.$watch(tableDataLoaded, function(isTableDataLoaded) {
                if (isTableDataLoaded) {
                    transformTable();
                }
            });

            function tableDataLoaded() {
                // first cell in the tbody exists when data is loaded but doesn't have a width
                // until after the table is transformed
                var firstCell = elem.querySelector('tbody tr:first-child td:first-child');
                return firstCell && !firstCell.style.width;
            }

            function transformTable() {
                // reset display styles so column widths are correct when measured below
                angular.element(elem.querySelectorAll('thead, tbody, tfoot')).css('display', '');

                // wrap in $timeout to give table a chance to finish rendering
                $timeout(function () {
                    // set widths of columns
                    angular.forEach(elem.querySelectorAll('tr:first-child th'), function (thElem, i) {

                        var tdElems = elem.querySelector('tbody tr:first-child td:nth-child(' + (i + 1) + ')');
                        var tfElems = elem.querySelector('tfoot tr:first-child td:nth-child(' + (i + 1) + ')');

                        var columnWidth = tdElems ? tdElems.offsetWidth : thElem.offsetWidth;
                        if (tdElems) {
                          //La asignacion es de porcentaje para que el valor no sea fijo ya que
                          //cuando esta hide el td este tiene un tamaño de 0
                          if(columnWidth > 0 )
                              tdElems.style.width =  columnWidth + 'px';
                          else
                              tdElems.style.width =   '10%';
                        }

                        if (thElem) {
                            if(columnWidth > 0 )
                              thElem.style.width = columnWidth + 'px';
                            else
                              thElem.style.width = '10%'

                        }
                        if (tfElems) {
                            tfElems.style.width = columnWidth + 'px';
                        }
                    });

                    // set css styles on thead and tbody
                    angular.element(elem.querySelectorAll('thead, tfoot')).css('display', 'block');

                    angular.element(elem.querySelectorAll('tbody')).css({
                        'display': 'block',
                        'height': $attrs.tableHeight || 'inherit',
                        'overflow': 'auto'
                    });

                    // reduce width of last column by width of scrollbar
                    var tbody = elem.querySelector('tbody');
                    var scrollBarWidth = tbody.offsetWidth - tbody.clientWidth;
                    if (scrollBarWidth > 0) {
                        // for some reason trimming the width by 2px lines everything up better
                        scrollBarWidth -= 2;
                        var lastColumn = elem.querySelector('tbody tr:first-child td:last-child');
                        lastColumn.style.width = (lastColumn.offsetWidth - scrollBarWidth) + 'px';
                    }
                });
            }
        }
    };


app.directive("ngChartInversion", function ($http, $filter, ngTableParams) {
    return {
        template: "<div id='charter'></div>",
        link: function (scope, element) {
            scope.$watch("graficaEmisoras", function(){
                if (scope.graficaEmisoras != null) {
                    scope.groupEstrategia = [];
                    if(scope.graficaEmisoras.status == 1){
                        //scope.datosTablaEstrategia = scope.datosTablaEmisoras;
                        scope.datosTablaEstrategia= angular.copy(scope.datosTablaEmisoras);
                        var xCategoriesDate = [];
                        scope.importeFinal = 0;
                        var values = [];
                        var yMin = 0;
                        var yMax = 0;
                        for (var i = 0; i < scope.graficaEmisoras.result.simulator.length; i++) {
                            if (i === 0) {
                                var yMin = scope.graficaEmisoras.result.simulator[i].investmentFinal;
                                var yMax = scope.graficaEmisoras.result.simulator[i].investmentFinal;
                            } else {
                                if (yMin > scope.graficaEmisoras.result.simulator[i].investmentFinal)
                                    yMin = scope.graficaEmisoras.result.simulator[i].investmentFinal;
                                if (yMax < scope.graficaEmisoras.result.simulator[i].investmentFinal)
                                    yMax = scope.graficaEmisoras.result.simulator[i].investmentFinal;
                            }
                            var auxDate = new Date(scope.graficaEmisoras.result.simulator[i].datePrice); //Zona hORARIA -((6*60*60)*1000)
                            var month = '' + (auxDate.getMonth() + 1);
                            var day = '' + auxDate.getDate();
                            var year = auxDate.getFullYear();
                            if (month.length < 2)
                                month = '0' + month;
                            if (day.length < 2)
                                day = '0' + day;
                            xCategoriesDate[i] = [day, month, year].join('/');
                            values[i] = parseFloat(parseFloat(scope.graficaEmisoras.result.simulator[i].investmentFinal).toFixed(2));
                            scope.lastValue = parseFloat(parseFloat(scope.graficaEmisoras.result.simulator[i].investmentFinal).toFixed(2));
                        }                            
                        for(var i = 0; i <= scope.graficaEmisoras.result.issuers.length - 1; i++){
                            scope.datosTablaEstrategia[i].inversionFinal = scope.graficaEmisoras.result.issuers[i].elements[scope.graficaEmisoras.result.simulator.length - 1].investmentFinal;
                            scope.importeFinal+=scope.graficaEmisoras.result.issuers[i].elements[scope.graficaEmisoras.result.simulator.length - 1].investmentFinal;
                            //scope.groupEstrategia.push({
                            //    "clasificacion": scope.datosTablaEstrategia[i].clasificacion});
                        }
                        scope.tableValuacion = new ngTableParams({
                            page: 1,
                            count: 15/*,
                            group: 'familia'*/
                        }, {
                            groupBy: "familia",
                            total: scope.datosTablaEstrategia.length,
                            getData: function ($defer, params) {
                                var filteredData = params.filter() ?
                                        $filter('filter')(scope.datosTablaEstrategia, params.filter()) :
                                        scope.datosTablaEstrategia;
                                var orderedData = params.sorting() ?
                                        $filter('orderBy')(filteredData, params.orderBy()) :
                                        scope.datosTablaEstrategia;
                                if (_.has(orderedData, 'length')) {
                                    params.total(orderedData.length);
                                    $defer.resolve(scope.dataEstrategias = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                }
                            },
                            scope: {
                                $data: {}
                            }
                        });
                        //scope.tableValuacion.$params.total = scope.datosTablaEstrategia.length;
                        scope.tableValuacion.settings().$scope = scope;

                        scope.datosTablaEstrategia.push({
                            "producto":  'Total:',
                            "emisora": null,
                            "serie": null,
                            "monto": scope.monto,
                            "porcentajeInversion": 100,
                            "inversionFinal": scope.importeFinal,
                            "clasificacion": null,
                            "familia": "none"
                        });
                        scope.tableValuacion.reload();

                        scope.dataC = values;
                        $("#charter").highcharts({
                            title: {
                                text: ''
                            },
                            chart: {
                                zoomType: 'x',
                                height: 350
                            },
                            xAxis: {
                                type: 'datetime',
                                categories: xCategoriesDate,
                                title: {
                                    text: 'Fecha'
                                },
                                labels: {
                                    rotation: -45,
                                    style: {
                                        fontSize: '13px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
                                }
                            },
                            yAxis: {
                                min: (yMin),
                                title: {
                                    text: 'Volumen'
                                }
                            },
                            legend: {
                                enabled: false
                            },
                            plotOptions: {
                                area: {
                                    fillColor: {
                                        /*linearGradient: {
                                            x1: 0,
                                            y1: 0,
                                            x2: 0,
                                            y2: 1
                                        },*/
                                        stops: [
                                            [0, Highcharts.getOptions().colors[0]],
                                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                        ]
                                    },
                                    marker: {
                                        radius: 2
                                    },
                                    lineWidth: 1,
                                    states: {
                                        hover: {
                                            lineWidth: 1
                                        }
                                    },
                                    threshold: null
                                }
                            },
                            tooltip: {
                                pointFormat: '<span>Valuación</span>: <b> $ {point.y} </b>',
                                shared: true
                            },
                            series: [{
                                    type: 'area',                                            
                                    data: scope.dataC
                                }]
                        });
                        $("svg").width("auto");
                        $("svg").height("auto");
                    }
                    else
                        $scope.showMessage(scope.graficaEmisoras.messages[0].description, false);                        
                }
            });
        }
    };
});

app.directive("modalChallengeLogin", function($rootScope) {
    return {
         scope: {
                    "paramreturn": "=",
                },
        template : ' <div class="modal fade" id="modal-challenge" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n\
      <div class="modal-dialog" role="document">\n\
        <div class="modal-content">\n\
            <div class="modal-body">\n\
              <div class="row">\n\
                <div class="col-md-6 challenge-login">\n\
                  <h5>1. CHALLENGE</h5>\n\
                  <p class="text-challenge">Captura en tu <span class="text-span-login">"ActiPass"</span> la siguiente clave:</p>\n\
                  <div class="form-group">\n\
                    <div class="input-group">\n\
                      <input type="text" class="form-control input-challenge-login" id="challengeLogin" placeholder="{{tokenChallengeByClientRequest.newValueType}}" value="{{tokenChallengeByClientRequest.newValueType}}" autocomplete="off" disabled>\n\
                      <div class="input-group-addon input-addon-challenge"><a href="javascript:;" ng-click="refreshTimerTrans();"><i class="fa fa-refresh" style="color:#999;"></i></a></div>\n\
                    </div>\n\
                    <div class="counter-challenge-login">\n\
                      <div>\n\
                         <svg version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\
                        viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\n\
                      <circle fill="none" stroke="#337ab7" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>\n\
                      <line fill="none"  id="lineBursanet"\n\
                      stroke-linecap="round"\n\
                      stroke="#337ab7"\n\
                      stroke-width="4"\n\
                      stroke-miterlimit="10"   x1="50" y1="50"   x2="50" y2="15">\n\
                        <animateTransform\n\
                             id="clockBursanet"\n\
                             attributeName="transform"\n\
                             begin="indefinite"\n\
                             dur="120s"\n\
                             type="rotate"\n\
                             from="0 50 50"\n\
                             to="360 50 50"\n\
                             fill="freeze"\n\
                             repeatCount="indefinite" />\n\
                      </line>\n\
                      </svg>\n\
                      </div>\n\
                      <div class="clearfix"></div>\n\
                      <span id="timeChalling" class="spinner-challenge-login">02:00</span>\n\
                    </div>\n\
                    <div class="checkbox qr-code-challenge">\n\
                      <label>\n\
                        <input class="qr-code-checkbox" type="checkbox" ng-true-value="\'A\'" ng-false-value="\'B\'" ng-model="qrcode"> Mostrar <b>QR CODE</b>\n\
                      </label>\n\
                      <div id="content-qr-code" ng-show="qrcode == \'A\'">\n\
                        <p>También puedes escanear este <span class="text-span-login">"Código QR"</span> con tu celular para obtener la clave dinámica</p>\n\
                        <div class="text-center">\n\
                          <div id="qrcode" style="margin-top: 2px;"></div>\n\
                        </div>\n\
                      </div>\n\
                    </div>\n\
                  </div>\n\
                </div>\n\
                <div class="col-md-6 numeric-key-login">\n\
                  <form id="token" role="form" name="tokenForm">\n\
                    <H5>2. CLAVE NUMÉRICA</H5>\n\
                    <p class="text-challenge text-justify">Ingresa la clave numérica que generó tu <span class="text-span-login">"ActiPass"</span> ó la clave que generó el <span class="text-span-login">"Código QR"</span> en el siguiente espacio:</p>\n\
                    <div class="form-group container-numeric-key1 containerInput border-yellow">\n\
                        <div class="input-group">\n\
                          <div id="input-tkn" class="input-group-addon input-addon-password"><i class="fa fa-lock ilockTKN text-yellow"></i></div>\n\
                          <input id="challenge" ng-focus="activeInputTKNApp();" autocomplete="off" name="ntokenid" \n\
                          type="text" class="form-control input-user activeInput" id="challenge" placeholder="Ingrese clave numérica"\n\
                          ng-model="newValueType" ng-pattern="/^[0-9]{8}?$/" maxlength="8" ng-minlength="8" ng-required="true"\n\
                            ">\n\
                        </div>\n\
                    </div>\n\
                    <div>\n\
                      <span ng-show="tokenForm.ntokenid.$invalid && !tokenForm.ntokenid.$pristine || tokenForm.ntokenid.$error.pattern && !tokenForm.ntokenid.$pristine" class="error-message">Ingrese su clave numérica con valores a 8 dígitos</span>\n\
                    </div>\n\
                    <div class="text-right btns-challenge">\n\
                      <button type="button" class="btn btn-primary btn-cancelar" data-dismiss="modal" ng-click="cancelar();">Cancelar</button>\n\
                      <button type="button" class="btn btn-default btn-cancelar" data-dismiss="modal" ng-click="confirmar();" ng-disabled="tokenForm.$invalid || tokenForm.ntokenid.$error.pattern" >Confirmar</button>\n\
                    </div>\n\
                  </form>\n\
                </div>\n\
                </div>\n\
              <div>\n\
            </div>\n\
          </div>\n\
        </div>\n\
      </div>\n\
    </div>',
    link: function ($scope, elem, attrs,modelCtrl,dataServices, callRestFactory, showMessageError) {
            $scope.activeInputTKNApp = function(){
              
              $('#input-tkn').removeClass('input-addon-user')

            };

            $scope.cancelar = function(){
                $scope.paramreturn (false);
            };

            $scope.confirmar = function(){
                $scope.paramreturn (true);
            }

            $scope.refreshTimerTrans = function() {
                $scope.paramreturn ('refresTime');
            }


        }
    };
});


/*DIRECTIVA AUTOCOMPLETE*/

app.directive('angucomplete', function ($parse, $http, $sce, $timeout,$rootScope,$filter) {
            return {
                restrict: 'EA',
                scope: {
                    "id": "@id",
                    "placeholder": "@placeholder",
                    "selectedObject": "=selectedobject",
                    "url": "@url",
                    "dataField": "@datafield",
                    "titleField": "@titlefield",
                    "descriptionField": "@descriptionfield",
                    "imageField": "@imagefield",
                    "imageUri": "@imageuri",
                    "inputClass": "@inputclass",
                    "userPause": "@pause",
                    "localData": "=localdata",
                    "searchFields": "@searchfields",
                    "minLengthUser": "@minlength",
                    "matchClass": "@matchclass"
                },
                template: '<div class="angucomplete-holder">\n\
                            <input id="{{id}}_value" ng-model="searchStr" type="text" placeholder="{{placeholder}}" class="{{inputClass}}" \n\
                             onmouseup="this.select();" ng-focus="resetHideResults()" ng-blur="hideResults()" ng-required="this.esRequerido" ><div id="{{id}}_dropdown" \n\
                             class="angucomplete-dropdown" ng-if="showDropdown">\n\
                            <div class="angucomplete-searching" ng-show="searching">Buscando...</div>\n\
                            <div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)">No se encontraron resultados</div>\n\
                            <div class="angucomplete-row" ng-repeat="result in results" ng-mousedown="selectResult(result)" \n\
                             ng-mouseover="hoverRow()" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">\n\
                            <div ng-if="imageField" class="angucomplete-image-holder">\n\
                            <img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/>\n\
                            <div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div></div>\n\
                            <div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div>\n\
                            <div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div>\n\
                            <div ng-if="result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div>\n\
                           </div></div></div>',
                link: function ($scope, elem, attrs,modelCtrl) {
                    $scope.lastSearchTerm = null;
                    $scope.currentIndex = null;
                    $scope.justChanged = false;
                    $scope.searchTimer = null;
                    $scope.hideTimer = null;
                    $scope.searching = false;
                    $scope.pause = 500;
                    $scope.minLength = 3;
                    
                    $scope.$watch('searchStr', function (val) {
                        
                        $scope.searchStr =  $filter('uppercase')(val);

                    }, true);

                    if ($scope.minLengthUser && $scope.minLengthUser !== "") {
                        $scope.minLength = $scope.minLengthUser;
                    }

                    if ($scope.userPause) {
                        $scope.pause = $scope.userPause;
                    }

                    $scope.isNewSearchNeeded = function (newTerm, oldTerm) {
                        return newTerm.length >= $scope.minLength && newTerm != oldTerm
                    };

                    $scope.processResults = function (responseData, str) {
                        if (responseData && responseData.length > 0) {
                            $scope.results = [];

                            var titleFields = [];
                            if ($scope.titleField && $scope.titleField !== "") {
                                titleFields = $scope.titleField.split(",");
                            }

                            for (var i = 0; i < responseData.length; i++) {
                                // Get title variables
                                var titleCode = [];

                                for (var t = 0; t < titleFields.length; t++) {
                                    titleCode.push(responseData[i][titleFields[t]]);
                                }

                                var description = "";
                                if ($scope.descriptionField) {
                                    description = responseData[i][$scope.descriptionField];
                                }

                                var imageUri = "";
                                if ($scope.imageUri) {
                                    imageUri = $scope.imageUri;
                                }

                                var image = "";
                                if ($scope.imageField) {
                                    image = imageUri + responseData[i][$scope.imageField];
                                }

                                var text = titleCode.join(' ');
                                if ($scope.matchClass) {
                                    var re = new RegExp(str, 'i');
                                    var strPart = text.match(re)[0];
                                    text = $sce.trustAsHtml(text.replace(re, '<span class="' + $scope.matchClass + '">' + strPart + '</span>'));
                                }

                                var resultRow = {
                                    title: text,
                                    description: description,
                                    image: image,
                                    originalObject: responseData[i]
                                };

                                $scope.results[$scope.results.length] = resultRow;
                            }


                        } else {
                            $scope.results = [];
                        }
                    };

                    $scope.searchTimerComplete = function (str) {
                        // Begin the search

                        if (str != undefined && str.length >= $scope.minLength) {
                            if ($scope.localData) {
                                var searchFields = $scope.searchFields.split(",");
                                var matches = [];

                                for (var i = 0; i < $scope.localData.length; i++) {
                                    var match = false;

                                    for (var s = 0; s < searchFields.length; s++) {
                                        match = match || (typeof $scope.localData[i][searchFields[s]] === 'string' && typeof str === 'string' && $scope.localData[i][searchFields[s]].toLowerCase().indexOf(str.toLowerCase()) >= 0);
                                    }

                                    if (match) {
                                        matches[matches.length] = $scope.localData[i];
                                    }
                                }

                                $scope.searching = false;
                                $scope.processResults(matches, str);

                            } else {
                                $http.get($scope.url + str, {}).
                                        success(function (responseData, status, headers, config) {
                                            $scope.searching = false;
                                            $scope.processResults((($scope.dataField) ? responseData[$scope.dataField] : responseData), str);
                                        }).
                                        error(function (data, status, headers, config) {
                                        });
                            }
                        }
                    };

                    $scope.hideResults = function () {
                        
                        if($rootScope.isStopInCapital == true){
                            $scope.esRequerido = false;
                        }

                        $scope.hideTimer = $timeout(function () {
                            $scope.showDropdown = false;
                        }, $scope.pause);
                    };

                    $scope.resetHideResults = function () {
                        if ($scope.hideTimer) {
                            $timeout.cancel($scope.hideTimer);
                        }
                        ;
                    };

                    $scope.hoverRow = function (index) {
                        $scope.currentIndex = index;
                    };

                    $scope.keyPressed = function (event) {

                          
                          $scope.esRequerido = true;

                          

                        if (!(event.which === 38 || event.which === 40 || event.which === 13)) {
                            if (!$scope.searchStr || $scope.searchStr === "") {
                                $scope.showDropdown = false;
                                $scope.lastSearchTerm = null;
                            } else if ($scope.isNewSearchNeeded($scope.searchStr, $scope.lastSearchTerm)) {
                                $scope.lastSearchTerm = $scope.searchStr;
                                $scope.showDropdown = true;
                                $scope.currentIndex = -1;
                                $scope.results = [];

                                if ($scope.searchTimer) {
                                    $timeout.cancel($scope.searchTimer);
                                }

                                $scope.searching = true;

                                $scope.searchTimer = $timeout(function () {
                                    $scope.searchTimerComplete($scope.searchStr);
                                }, $scope.pause);
                            }
                        } else {
                            event.preventDefault();
                        }
                    };

                    $scope.selectResult = function (result) {
                        //hacemos el llamado ala funcion corroShowData que hace el negocio de colocar precios
                        //y variables del formulario pára la compra venta


                        if($scope.id == 'productoAccionesFondosVenta' || $scope.id == 'productoAccionesFondosCompra')
                          $rootScope.$root.$$childTail.$$childTail.selectIssueFondos(result.originalObject,'fromEmisora');
                        else{
                            if($scope.id == 'productoAcciones1')
                                $rootScope.$root.$$childTail.$$childTail.corroShowData(result.originalObject,1);
                            if($scope.id == 'productoAccionesVender')
                                $rootScope.$root.$$childTail.$$childTail.corroShowData(result.originalObject,2);
                        }
                        if ($scope.matchClass) {
                            result.title = result.title.toString().replace(/(<([^>]+)>)/ig, '');
                        }
                        $scope.searchStr = $scope.lastSearchTerm = result.title;

                        $scope.selectedObject = result;
                        $scope.showDropdown = false;
                        $scope.results = [];

                        //console.log(result.title);
                        //$scope.$apply();
                    };

                    var inputField = elem.find('input');

                    inputField.on('keyup', $scope.keyPressed);

                    elem.on("keyup", function (event) {


                        $scope.esRequerido = true;
                        
                        if (event.which === 40) {
                            if ($scope.results && ($scope.currentIndex + 1) < $scope.results.length) {
                                $scope.currentIndex++;
                                $scope.$apply();
                                event.preventDefault;
                                event.stopPropagation();
                            }

                            $scope.$apply();
                        } else if (event.which === 38) {
                            if ($scope.currentIndex >= 1) {
                                $scope.currentIndex--;
                                $scope.$apply();
                                event.preventDefault;
                                event.stopPropagation();
                            }

                        } else if (event.which === 13) {
                            if ($scope.results && $scope.currentIndex >= 0 && $scope.currentIndex < $scope.results.length) {
                                $scope.selectResult($scope.results[$scope.currentIndex]);
                                $scope.$apply();
                                event.preventDefault;
                                event.stopPropagation();
                            } else {
                                $scope.results = [];
                                $scope.$apply();
                                event.preventDefault;
                                event.stopPropagation();
                            }

                        } else if (event.which === 27) {
                            $scope.results = [];
                            $scope.showDropdown = false;
                            $scope.$apply();
                        } else if (event.which === 8) {
                            $scope.selectedObject = null;
                            $scope.$apply();
                        }
                    });

                }
            };
        });


    app.directive("onlyAmount", function ($http) {
     return {
         require: 'ngModel',
         link: function (scope, element, attrs, modelCtrl) {
             modelCtrl.$parsers.push(function (inputValue) {
                 if (inputValue == undefined)
                     return ''
                 var transformedInput = inputValue.replace(/[^0-9]+\.+[0-9]{1,2}?$/g, '');
                 if (transformedInput != inputValue) {
                     modelCtrl.$setViewValue(transformedInput);
                     modelCtrl.$render();
                 }
                 return transformedInput;
             });
         }
     };

   });

   app.directive("numbersOnly", function ($http) {
       return {
           require: 'ngModel',
           link: function (scope, element, attrs, modelCtrl) {
               modelCtrl.$parsers.push(function (inputValue) {
                   if (inputValue == undefined)
                       return ''
                   var transformedInput = inputValue.replace(/[^0-9]/g, '');
                   if (transformedInput != inputValue) {
                       modelCtrl.$setViewValue(transformedInput);
                       modelCtrl.$render();
                   }
                   return transformedInput;
               });
           }
       };

   });
