var myApp = angular.module('myApp', [
	'ui.bootstrap','ngAnimate','ngSanitize'
]).controller(
	'MainCtrl', [function() {
		var self = this;

		self.lbCampoRequerido = 'Este campo es obligatorio. ';
		self.lbCampoInvalido = 'El valor ingresado es invalido. ';

		self.lbRangoInversionMinima = 'La cifra debe encontrarse en el rango de: $100 a $9999999999';
		self.lbRangoPlazoInversion = 'El plazo de la inversión debe encontrase entre: 1 a 999 meses';

		self.nombre = 'Simula tú inversión';
		self.descripcion = 'Conoce el valor del rendimiento de tu inversión, de acuerdo con la modalidad que tu hayas elegido y solicita abrir tu CDT ya.';
		self.nombreSimulador = 'Simulador de CDT Tasa Fija';

		self.lbTipoCDT = '¿Qué tipo de CDT quieres adquirir? *';
		self.lbValorInversion = '¿Cuál es el valor de tu inversión? *'
		self.lbPlazoInversion = '¿A qué plazo deseas tenerlo? *';
		self.lbPeriodicidad = '¿Con qué periodicidad deseas el pago de tus intereses? *';

		self.arrayTipoSimulador = [{
			id: 1,
			label: 'CDT BANCOLOMBIA'
		}, {
			id: 2,
			label: 'CDT LEASING BANCOLOMBIA'
		}];

		self.arrayPeriodicidadPagoIntereses = [{
			id: 30,
			label: 'Mensual'
		}, {
			id: 60,
			label: 'Bimestral'
		}, {
			id: 90,
			label: 'Trimestral'
		}, {
			id: 180,
			label: 'Semestral'
		}];

		self.submit = function() {
			
		};
	}]).controller('CarouselDemoCtrl', function ($scope) {
}).controller('DatepickerDemoCtrl', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
});

myApp.config(['datepickerConfig', function(datepickerConfig) {
    datepickerConfig.showWeeks = false;
}]).config(['datepickerPopupConfig', function(datepickerPopupConfig) {
    datepickerPopupConfig.showButtonBar = false;
}]);



$(document).ready(function(){

	/* Resize Button Groups so all buttons within the group are of equal width */

	/*$('.btn-size').each(function(i,e){
		$(e).find('.btn').width(
			Math.max.apply(
				Math,
				$(e).find('.btn').map(function() {
					return $(this).outerWidth();
				}).get()
			)
		)}
	);*/
	
	$('fieldset .row').each(function(i,e){
		
		$(e).find('label').height(
			Math.max.apply(
				Math,
				$(e).find('label').map(function() {
					return $(this).outerHeight();
				}).get()
			)
		)}
	);

	function equalize(element, within, dimension) {
		// TODO: Combine the two functions above into one
	}

	$('.contextual-help').addClass('collapse');
	$('a[href].input-help').click(function(e){
		e.preventDefault();
		$('.contextual-help').removeClass('in');
		$(this.hash).addClass('in');
	})
	$('.contextual-help1').addClass('collapse');
	$('a[href].input-help').click(function(e){
		e.preventDefault();
		$('.contextual-help1').removeClass('in');
		$(this.hash).addClass('in');
	})

	/* Article Reading Time */
    var $article = $('article');

    //$article.readingTime({
    //    readingTimeTarget: $article.find('.read-time')
    //});

	/* Responsive breadcrumbs */

/*
    $(window).resize(function() {

        ellipses1 = $(".breadcrumb :nth-child(2)")
        if ($(".breadcrumb a:hidden").length >0) {ellipses1.show()} else {ellipses1.hide()}
   
    })
 */  
});
