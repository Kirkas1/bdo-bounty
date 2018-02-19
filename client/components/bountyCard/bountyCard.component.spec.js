'use strict';

describe('Component: bountyCard', function() {
  // load the component's module
  beforeEach(module('bdoBountyApp.bountyCard'));

  var bountyCardComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    bountyCardComponent = $componentController('bountyCard', {});
  }));

  it('should ...', function() {
    1.should.equal(1);
  });
});
