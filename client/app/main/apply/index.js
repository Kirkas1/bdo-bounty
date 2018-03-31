'use strict';

import angular from 'angular';
import ApplyController from './apply.controller';

export default angular.module('bdoBountyApp.apply', [])
   .component('apply', {
      template: require('./apply.html'),
      bindings: {
         resolve: '<'
      },
      controller: ApplyController
   })
  .name;
