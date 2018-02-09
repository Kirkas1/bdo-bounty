(function() {
	'use strict';

	angular
		.module('bdoBounty')
		.config(config);

	/** @ngInject */
	function config($logProvider) {
		// Enable log
		$logProvider.debugEnabled(true);
	}

})();
