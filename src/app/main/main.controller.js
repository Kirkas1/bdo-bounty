(function() {
	'use strict';

	angular
		.module('bdoBounty')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController(
		$log,
		$uibModal
	) {
		var vm = this;

		vm.modalTypes = {
			LOG_IN: "Log in",
			POST_BOUNTY: "Post Bounty",
			APPLY_BOUNTY: "Apply for Bounty"
		};

		init();

		function init() {
			vm.greeting = "Hey there!";
		}

		vm.openModal = function(modalType) {
			$log.debug("Opening modal!", modalType);
			var modalObj = {
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body'
			};

			switch(modalType) {
				case vm.modalTypes.LOG_IN:
					modalObj.templateUrl = 'app/components/logIn/log-in.tpl.html';
					modalObj.controller = 'LogInController';
					modalObj.controllerAs = 'vm';
					$uibModal.open(modalObj);
					break;
				case vm.modalTypes.POST_BOUNTY:
					break;
				case vm.modalTypes.APPLY_BOUNTY:
					break;
				default:
					$log.debug("Error with modal type!", modalType);
					break;
			}
		}
	}
})();
