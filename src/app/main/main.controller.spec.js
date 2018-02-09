(function() {
	'use strict';

	describe('controllers', function() {
		var vm;
		var $timeout;
		var toastr;

		beforeEach(module('bdoBounty'));
		beforeEach(inject(function(_$controller_, _$timeout_) {

			vm = _$controller_('MainController');
			$timeout = _$timeout_;
			toastr = _toastr_;
		}));

		// it('should have a timestamp creation date', function() {
		// 	expect(vm.creationDate).toEqual(jasmine.any(Number));
		// });
		//
		// it('should define animate class after delaying timeout ', function() {
		// 	$timeout.flush();
		// });
		//
		// it('should show a Toastr info and stop animation when invoke showToastr()', function() {
		// 	vm.showToastr();
		// 	expect(toastr.info).toHaveBeenCalled();
		// 	expect(vm.classAnimation).toEqual('');
		// });
		//
		// it('should define more than 5 awesome things', function() {
		// 	expect(angular.isArray(vm.awesomeThings)).toBeTruthy();
		// 	expect(vm.awesomeThings.length === 5).toBeTruthy();
		// });
	});
})();
