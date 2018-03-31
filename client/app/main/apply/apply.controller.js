'use strict';

import angular from 'angular';

export default class ApplyController {
	application = {
      charName: "",
      familyName: "",
      guild: "",
      className: "",
      level: 0,
      gearScore: 0,
      server: "",
      location: "",
   };


	/*@ngInject*/
	constructor(Auth, $state, $log) {
		this.Auth = Auth;
		this.$state = $state;
      this.$log = $log;
	}

   $onInit() {
      this.$log.debug("On init!", this);
      this.bountyObj = this.resolve.bountyObj;
   }

	goApply() {
		this.$log.debug("Wowzers?", this.resolve.bountyObj);
	}
}
