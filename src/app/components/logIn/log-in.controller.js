(function() {
	'use strict';

	angular
		.module('bdoBounty')
		.controller('LogInController', LogInController);

	/** @ngInject */
	function LogInController(
		$log
	) {
		var vm = this;

		init();

		function init() {
			vm.greeting = "Log in!";
		}
	}
})();
