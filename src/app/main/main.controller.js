(function() {
	'use strict';

	angular
		.module('bdoBounty')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController() {
		var vm = this;
		init();

		function init() {
			vm.greeting = "Hey there!";
		}
	}
})();
