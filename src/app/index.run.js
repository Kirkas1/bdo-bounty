(function() {
	'use strict';

	angular
		.module('bdoBounty')
		.run(runBlock);

	/** @ngInject */
	function runBlock($log) {

		$log.debug('runBlock end');
	}

})();
